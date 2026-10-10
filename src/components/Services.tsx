import { offeredServices } from "@/content/services";
import { SectionHeading } from "./SectionHeading";
import { Arrow, BookingButton } from "./CtaLink";

function ConnectedVisual() {
  const nodes = ["Strategy", "Website", "Content", "Ads", "SEO", "Analytics"];
  return (
    <div className="grain relative mt-10 aspect-[5/4] overflow-hidden rounded-[24px] bg-ink-950 p-6 text-white" aria-hidden="true">
      <div className="motion-loop absolute -left-1/4 -top-1/3 h-[90%] w-[90%] animate-drift-a rounded-full bg-[radial-gradient(circle,rgba(46,107,255,0.55),transparent_65%)] blur-2xl" />
      <div className="motion-loop absolute -bottom-1/3 -right-1/4 h-[80%] w-[80%] animate-drift-b rounded-full bg-[radial-gradient(circle,rgba(63,214,255,0.35),transparent_65%)] blur-2xl" />
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="relative flex h-full items-center justify-center">
        <div className="relative aspect-square w-[72%]">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-[18%] rounded-full border border-dashed border-white/10" />
          <div className="absolute left-1/2 top-1/2 flex h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-royal via-electric to-cyan shadow-[0_0_60px_rgba(46,107,255,0.6)]">
            <span className="font-display text-xs font-bold tracking-[0.18em]">GROWTH</span>
          </div>
          {nodes.map((n, i) => {
            const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(a) * 50;
            const y = 50 + Math.sin(a) * 50;
            return (
              <span
                key={n}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-navy-900/90 px-3 py-1.5 text-[0.7rem] font-semibold backdrop-blur"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {n}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-hidden bg-paper py-24 text-ink-text sm:py-32">
      <div className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_40%)]" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-electric/10 blur-[120px]" />

      <div className="container-x relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="services-title"
            tone="light"
            eyebrow="What we do"
            title="Everything working together to move your business forward."
            intro="From building your digital presence to creating campaigns that reach the right audience, E-Reach Marketing helps businesses turn their marketing into a more intentional growth process."
          />
          <div data-reveal className="mt-9">
            <BookingButton>Let&apos;s discuss your goals</BookingButton>
          </div>
          <div className="hidden lg:block" data-reveal="mask">
            <ConnectedVisual />
          </div>
        </div>

        <ol className="border-t border-ink-text/10">
          {offeredServices.map((s, i) => (
            <li
              key={s.id}
              data-reveal
              className="group relative border-b border-ink-text/10"
            >
              <div className="absolute inset-y-0 -left-4 -right-4 origin-left scale-x-[0.98] rounded-2xl bg-white opacity-0 shadow-[0_20px_50px_-30px_rgba(10,18,48,0.35)] transition-all duration-500 ease-out-expo group-hover:scale-x-100 group-hover:opacity-100 sm:-left-6 sm:-right-6" />
              <div className="relative grid gap-4 py-8 sm:grid-cols-[4.5rem_1fr] sm:py-9">
                <span className="font-display text-sm font-semibold text-slate-text/60 transition-colors duration-300 group-hover:text-electric">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-2xl font-semibold leading-tight sm:text-[1.75rem]">{s.title}</h3>
                    <span className="mt-1.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-text/15 text-ink-text transition-all duration-500 ease-out-expo group-hover:border-electric group-hover:bg-electric group-hover:text-white sm:flex">
                      <Arrow className="-rotate-45" />
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl leading-relaxed text-slate-text">{s.description}</p>
                  <p className="mt-3 max-w-xl text-[0.95rem] font-semibold leading-relaxed text-ink-text">
                    <span className="text-electric">Why it matters:</span> {s.value}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${s.title} includes`}>
                    {s.tags.map((t) => (
                      <li key={t} className="rounded-full bg-ink-text/[0.05] px-3 py-1 text-xs font-semibold text-slate-text">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="container-x relative mt-20">
        <div data-reveal className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-ink-text p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <p className="max-w-xl font-display text-2xl font-semibold leading-tight">
            Not sure which services you need? That&apos;s what the first conversation is for.
          </p>
          <BookingButton>Get a marketing strategy</BookingButton>
        </div>
      </div>
    </section>
  );
}
