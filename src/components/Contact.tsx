import { bookingIsExternal, site } from "@/content/site";
import { BookingButton, PhoneIcon } from "./CtaLink";
import { LeadForm } from "./LeadForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="grain relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_0%_0%,rgba(46,107,255,0.28),transparent_70%),radial-gradient(50%_50%_at_100%_100%,rgba(63,214,255,0.12),transparent_70%)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />

      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div>
          <p data-reveal className="eyebrow inline-flex items-center gap-3 text-cyan">
            <span className="h-px w-8 bg-cyan/60" aria-hidden="true" />
            Book a call
          </p>
          <h2 id="contact-title" data-reveal className="mt-6 text-[2.4rem] font-semibold leading-[1.02] text-white sm:text-5xl lg:text-[3.6rem]">
            Let&apos;s grow your business.
          </h2>
          <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-mist">
            Book a free consultation. No pressure, just a conversation about your goals.
          </p>

          <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {bookingIsExternal && <BookingButton>Pick a time</BookingButton>}
            <a href={site.phone.href} className="btn btn-ghost">
              <PhoneIcon />
              Call {site.phone.display}
            </a>
          </div>
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
