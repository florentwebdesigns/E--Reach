"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  budgetOptions,
  emptyLead,
  goalOptions,
  serviceOptions,
  validateLead,
  type LeadErrors,
  type LeadInput,
} from "@/lib/lead";
import { bookingIsExternal, site } from "@/content/site";
import { Arrow, PhoneLink } from "./CtaLink";

type Status = "idle" | "submitting" | "success" | "error";

const fieldOrder: (keyof LeadInput)[] = [
  "fullName",
  "businessName",
  "email",
  "phone",
  "website",
  "industry",
  "services",
  "goal",
  "budget",
  "details",
];

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

  const blur = (k: keyof LeadInput) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validateLead(values)[k] }));
  };

  const toggleService = (s: string) => {
    set("services", values.services.includes(s) ? values.services.filter((x) => x !== s) : [...values.services, s]);
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
        <h3 className="mt-8 text-3xl font-semibold text-ink-text">Thanks, {values.fullName.split(" ")[0]}. Your request is in.</h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-text">
          We&apos;ve received your consultation request and will reach out at <strong className="text-ink-text">{values.email}</strong> to find a time
          that works. This is a request, not a confirmed appointment.
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
        <h3 className="text-[1.9rem] font-semibold leading-tight text-ink-text sm:text-[2.2rem]">Tell us what you want to achieve.</h3>
        <p className="mt-2 text-slate-text">Share a few details about your business and we&apos;ll take it from there.</p>
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
            Full name <span className="text-electric">*</span>
          </label>
          <input id="fullName" name="fullName" className="field" autoComplete="name" required value={values.fullName} onChange={(e) => set("fullName", e.target.value)} onBlur={() => blur("fullName")} {...aria("fullName")} />
          <FieldError id="fullName-error" msg={err("fullName")} />
        </div>
        <div>
          <label htmlFor="businessName" className="field-label">Business name</label>
          <input id="businessName" name="businessName" className="field" autoComplete="organization" value={values.businessName} onChange={(e) => set("businessName", e.target.value)} onBlur={() => blur("businessName")} {...aria("businessName")} />
          <FieldError id="businessName-error" msg={err("businessName")} />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email address <span className="text-electric">*</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" className="field" autoComplete="email" required value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} {...aria("email")} />
          <FieldError id="email-error" msg={err("email")} />
        </div>
        <div>
          <label htmlFor="phone" className="field-label">Phone number</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="(555) 555-5555" value={values.phone} onChange={(e) => set("phone", e.target.value)} onBlur={() => blur("phone")} {...aria("phone")} />
          <FieldError id="phone-error" msg={err("phone")} />
        </div>
        <div>
          <label htmlFor="website" className="field-label">
            Website <span className="font-normal text-slate-text/70">(optional)</span>
          </label>
          <input id="website" name="website" type="text" inputMode="url" className="field" autoComplete="url" placeholder="yourbusiness.com" value={values.website} onChange={(e) => set("website", e.target.value)} onBlur={() => blur("website")} {...aria("website")} />
          <FieldError id="website-error" msg={err("website")} />
        </div>
        <div>
          <label htmlFor="industry" className="field-label">Industry or business type</label>
          <input id="industry" name="industry" className="field" placeholder="e.g. Home services, retail, fitness" value={values.industry} onChange={(e) => set("industry", e.target.value)} onBlur={() => blur("industry")} {...aria("industry")} />
          <FieldError id="industry-error" msg={err("industry")} />
        </div>

        <fieldset className="sm:col-span-2" aria-describedby={err("services") ? "services-error" : undefined}>
          <legend className="field-label">Services of interest</legend>
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((s) => (
              <label key={s} className="chip-check">
                <input type="checkbox" name="services" value={s} className="sr-only" checked={values.services.includes(s)} onChange={() => toggleService(s)} />
                {values.services.includes(s) && (
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true" style={{ animation: "fade 0.3s ease-out" }}>
                    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {s}
              </label>
            ))}
          </div>
          <FieldError id="services-error" msg={err("services")} />
        </fieldset>

        <div>
          <label htmlFor="goal" className="field-label">
            Primary marketing goal <span className="text-electric">*</span>
          </label>
          <select id="goal" name="goal" className="field" required value={values.goal} onChange={(e) => set("goal", e.target.value)} onBlur={() => blur("goal")} {...aria("goal")}>
            <option value="" disabled>
              Choose one
            </option>
            {goalOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <FieldError id="goal-error" msg={err("goal")} />
        </div>
        <div>
          <label htmlFor="budget" className="field-label">
            Estimated budget <span className="font-normal text-slate-text/70">(optional)</span>
          </label>
          <select id="budget" name="budget" className="field" value={values.budget} onChange={(e) => set("budget", e.target.value)} onBlur={() => blur("budget")} {...aria("budget")}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <FieldError id="budget-error" msg={err("budget")} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="details" className="field-label">Additional details</label>
          <textarea id="details" name="details" rows={4} className="field resize-y" placeholder="Where is your marketing today, and where would you like it to be?" value={values.details} onChange={(e) => set("details", e.target.value)} onBlur={() => blur("details")} {...aria("details")} />
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
              Request my consultation <Arrow />
            </>
          )}
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-slate-text/80">
          We only use your details to respond to your request. See our{" "}
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
