import { bookingIsExternal, site } from "@/content/site";
import { BookingButton, PhoneIcon } from "./CtaLink";
import { LeadForm } from "./LeadForm";

const next = [
  ["Share your goals", "Tell us about your business using the form. It takes about two minutes."],
  ["We review and reach out", "We'll look over your details and contact you to schedule a time to talk."],
  ["Free consultation", "A focused conversation about your marketing needs and possible next steps."],
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="grain relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_0%_0%,rgba(46,107,255,0.28),transparent_70%),radial-gradient(50%_50%_at_100%_100%,rgba(63,214,255,0.12),transparent_70%)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />

      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:pt-6">
          <p data-reveal className="eyebrow inline-flex items-center gap-3 text-cyan">
            <span className="h-px w-8 bg-cyan/60" aria-hidden="true" />
            Book a consultation
          </p>
          <h2 id="contact-title" data-reveal className="mt-6 text-[2.4rem] font-semibold leading-[1.02] text-white sm:text-5xl lg:text-[3.6rem]">
            Let&apos;s talk about your next growth opportunity.
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-mist">
            Tell us a little about your business and what you&apos;re looking to accomplish. We&apos;ll use that
            information to start a productive conversation about your marketing needs.
          </p>

          <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {bookingIsExternal ? (
              <BookingButton>Book a free consultation</BookingButton>
            ) : (
              <a href="#fullName" className="btn btn-primary">
                Book a free consultation
                <svg viewBox="0 0 16 16" className="btn-arrow h-4 w-4 rotate-90 lg:rotate-0" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            <a href={site.phone.href} className="btn btn-ghost">
              <PhoneIcon />
              Call our team · {site.phone.display}
            </a>
          </div>

          <ol className="mt-14 space-y-0 border-t border-white/[0.08]">
            {next.map(([t, d], i) => (
              <li key={t} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="flex gap-5 border-b border-white/[0.08] py-5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan/40 font-display text-xs font-semibold text-cyan">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-white">{t}</p>
                  <p className="mt-1 leading-relaxed text-mist">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="relative">
          <div className="pointer-events-none absolute -inset-px rounded-[30px] bg-gradient-to-br from-cyan/50 via-electric/30 to-violet/40 blur-xl" aria-hidden="true" />
          <div className="relative rounded-[28px] bg-white p-6 shadow-[0_50px_100px_-40px_rgba(46,107,255,0.6)] sm:p-10">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
