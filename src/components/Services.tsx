import { services } from "@/content/services";
import { SectionHeading } from "./SectionHeading";
import { BookingButton } from "./CtaLink";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-hidden bg-paper py-24 text-ink-text sm:py-32">
      <div className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_50%)]" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-electric/10 blur-[120px]" />

      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="services-title" tone="light" eyebrow="What we do" title="Everything you need to grow online." />
          <div data-reveal className="shrink-0">
            <BookingButton>Book a free consultation</BookingButton>
          </div>
        </div>

        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li
              key={s.id}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
              className="group relative border-t border-ink-text/10 py-8"
            >
              <span className="absolute -top-px left-0 h-px w-0 bg-gradient-to-r from-electric to-cyan transition-all duration-700 ease-out-expo group-hover:w-full" />
              <span className="font-display text-sm font-semibold text-slate-text/60 transition-colors group-hover:text-electric">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-text">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
