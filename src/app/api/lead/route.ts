import { normalizeLead, validateLead } from "@/lib/lead";

/**
 * Consultation request endpoint.
 *
 * Forwards validated leads to ONE of these destinations (server-side only, so
 * no keys are ever exposed to the browser):
 *
 *   FORMSPREE_FORM_ID  Formspree form id (e.g. "xyzabcd"). Emails each lead to you.
 *   LEAD_WEBHOOK_URL   Any HTTPS webhook (Zapier, Make, HubSpot workflow, CRM, Slack...).
 *
 * If neither is configured the endpoint returns 503 and the form shows an
 * honest error with the phone number. It never reports success unless the
 * destination accepted the lead.
 */

const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort, per-instance rate limit. Pair with Vercel Firewall rules for stronger protection.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam checks: hidden honeypot field and a minimum time to fill the form.
  const honeypot = typeof body.company_url === "string" ? body.company_url : "";
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    // Reject without forwarding anything.
    return Response.json({ ok: false, error: "We couldn't verify this submission. Please try again or call us." }, { status: 400 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please wait a few minutes, or give us a call." },
      { status: 429 },
    );
  }

  const lead = normalizeLead(body);
  const errors = validateLead(lead);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, error: "Please fix the highlighted fields.", errors }, { status: 422 });
  }

  const payload = {
    ...lead,
    services: lead.services.join(", "),
    source: "ereach-website",
    submittedAt: new Date().toISOString(),
  };

  const formspreeId = process.env.FORMSPREE_FORM_ID?.trim();
  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();

  if (!formspreeId && !webhook) {
    console.error("[lead] No lead destination configured. Set FORMSPREE_FORM_ID or LEAD_WEBHOOK_URL.");
    return Response.json(
      { ok: false, error: "Our form is temporarily unavailable. Please call us and we'll be glad to help." },
      { status: 503 },
    );
  }

  try {
    const res = formspreeId
      ? await fetch(`https://formspree.io/f/${encodeURIComponent(formspreeId)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...payload,
            _replyto: lead.email,
            _subject: `New consultation request: ${lead.fullName}${lead.businessName ? ` (${lead.businessName})` : ""}`,
          }),
          signal: AbortSignal.timeout(10000),
        })
      : await fetch(webhook!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        });

    if (!res.ok) {
      console.error("[lead] Destination rejected lead", res.status, await res.text().catch(() => ""));
      return Response.json(
        { ok: false, error: "We couldn't send your request just now. Please try again or call us." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[lead] Failed to reach destination", err);
    return Response.json(
      { ok: false, error: "We couldn't send your request just now. Please try again or call us." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
