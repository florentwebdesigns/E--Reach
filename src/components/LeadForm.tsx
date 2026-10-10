"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { emptyLead, helpOptions, validateLead, type LeadErrors, type LeadInput } from "@/lib/lead";
import { bookingIsExternal, site } from "@/content/site";
import { Arrow, PhoneLink } from "./CtaLink";

type Status = "idle" | "submitting" | "success" | "error";

const fieldOrder: (keyof LeadInput)[] = ["fullName", "email", "phone", "businessName", "help", "details"];

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return (
    <p id={id} className={`mt-1.5 text-sm font-medium text-[#c22f4d] ${msg ? "" : "hidden"}`} role={msg ? "alert" : undefined}>
      {msg}
    </p>
  );
}

export function LeadForm() {
  const [values, setValues] = useState<LeadInput>(emptyLead);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LeadInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  // Time the form became interactive, used server-side as a bot check.
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k] || errors[k]) setErrors((e) => ({ ...e, [k]: validateLead(next)[k] }));
  };

  const blur = (k: keyof LeadInput, e?: React.FocusEvent) => {
    // Moving focus to the submit button: let submit validate, so an error
    // appearing here doesn't shift the button out from under the click.
    if ((e?.relatedTarget as HTMLButtonElement | null)?.type === "submit") return;
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validateLead(values)[k] }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const found = validateLead(values);
    setErrors(found);
    setTouched(Object.fromEntries(fieldOrder.map((k) => [k, true])));
    const first = fieldOrder.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMsg("");
    const honeypot = (formRef.current?.elements.namedItem("company_url") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company_url: honeypot, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: LeadErrors };
      if (res.ok && data.ok) {
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMsg(data.error ?? "Something went wrong. Please try again or call us.");
      setStatus("error");
    } catch {
      setServerMsg("We couldn't reach the server. Please check your connection, or call us.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="flex min-h-[520px] flex-col items-start justify-center outline-none"
        role="status"
        aria-live="polite"
      >
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-electric to-cyan text-white shadow-[0_20px_40px_-10px_rgba(46,107,255,0.6)]">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" strokeDashoffset="24" style={{ animation: "dash 0.8s 0.2s var(--ease-out-expo) forwards" }} />
          </svg>
        </span>
        <h3 className="mt-8 text-3xl font-semibold text-ink-text">Thanks, {values.fullName.split(" ")[0]}. We got your request.</h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-text">
          We&apos;ll email you at <strong className="text-ink-text">{values.email}</strong> to set up a time to talk.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {bookingIsExternal && (
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              Pick a time now <Arrow />
            </a>
          )}
          <PhoneLink className="btn btn-outline-dark" />
        </div>
      </div>
    );
  }

  const err = (k: keyof LeadInput) => (touched[k] ? errors[k] : undefined);
  const aria = (k: keyof LeadInput, describe?: string) => ({
    "aria-invalid": err(k) ? (true as const) : undefined,
    "aria-describedby": [err(k) ? `${k}-error` : "", describe ?? ""].filter(Boolean).join(" ") || undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-required-note">
      <div className="mb-8">
        <h3 className="text-[1.9rem] font-semibold leading-tight text-ink-text">Request your free consultation</h3>
        <p id="form-required-note" className="mt-2 text-sm text-slate-text/80">
          Fields marked <span className="text-electric">*</span> are required.
        </p>
      </div>

      {/* Honeypot: hidden from people, tempting for bots */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_url">Leave this field empty</label>
        <input id="company_url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="field-label">
            Name <span className="text-electric">*</span>
          </label>
          <input id="fullName" name="fullName" className="field" autoComplete="name" required value={values.fullName} onChange={(e) => set("fullName", e.target.value)} onBlur={(e) => blur("fullName", e)} {...aria("fullName")} />
          <FieldError id="fullName-error" msg={err("fullName")} />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email <span className="text-electric">*</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" className="field" autoComplete="email" required value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={(e) => blur("email", e)} {...aria("email")} />
          <FieldError id="email-error" msg={err("email")} />
        </div>
        <div>
          <label htmlFor="phone" className="field-label">Phone</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="(555) 555-5555" value={values.phone} onChange={(e) => set("phone", e.target.value)} onBlur={(e) => blur("phone", e)} {...aria("phone")} />
          <FieldError id="phone-error" msg={err("phone")} />
        </div>
        <div>
          <label htmlFor="businessName" className="field-label">Business name</label>
          <input id="businessName" name="businessName" className="field" autoComplete="organization" value={values.businessName} onChange={(e) => set("businessName", e.target.value)} onBlur={(e) => blur("businessName", e)} {...aria("businessName")} />
          <FieldError id="businessName-error" msg={err("businessName")} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="help" className="field-label">
            What do you need help with? <span className="text-electric">*</span>
          </label>
          <select id="help" name="help" className="field" required value={values.help} onChange={(e) => set("help", e.target.value)} onBlur={(e) => blur("help", e)} {...aria("help")}>
            <option value="" disabled>
              Choose one
            </option>
            {helpOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <FieldError id="help-error" msg={err("help")} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="details" className="field-label">Anything else? <span className="font-normal text-slate-text/70">(optional)</span></label>
          <textarea id="details" name="details" rows={3} className="field resize-y" value={values.details} onChange={(e) => set("details", e.target.value)} onBlur={(e) => blur("details", e)} {...aria("details")} />
          <FieldError id="details-error" msg={err("details")} />
        </div>
      </div>

      {status === "error" && serverMsg && (
        <div role="alert" className="mt-6 rounded-xl border border-[#c22f4d]/25 bg-[#c22f4d]/[0.06] px-4 py-3 text-sm text-[#8f1d35]">
          {serverMsg}{" "}
          <a href={site.phone.href} className="font-semibold underline">
            Call {site.phone.display}
          </a>
        </div>
      )}

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full !min-h-14 !px-8 text-base disabled:cursor-wait disabled:opacity-80 sm:w-auto">
          {status === "submitting" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
              Sending your request…
            </>
          ) : (
            <>
              Book my consultation <Arrow />
            </>
          )}
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-slate-text/80">
          We only use your details to reply to you. See our{" "}
          <Link href="/privacy" className="underline hover:text-electric">
            privacy policy
          </Link>
          .
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Sending your request" : ""}
      </p>
    </form>
  );
}
