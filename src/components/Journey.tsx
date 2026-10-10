import { BookingButton } from "./CtaLink";
import { SectionHeading } from "./SectionHeading";

const stages = [
  {
    n: "01",
    title: "Reach",
    text: "Connect the business with relevant audiences.",
    icon: (
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4M5 5a10 10 0 0 0 0 14M19 19a10 10 0 0 0 0-14" />
    ),
  },
  {
    n: "02",
    title: "Engage",
    text: "Use compelling messaging and creative to earn attention.",
    icon: <path d="M4 5h16v11H9l-5 4zM8 9.5h8M8 12.5h5" />,
  },
  {
    n: "03",
    title: "Convert",
    text: "Guide interested visitors toward a meaningful next step.",
    icon: <path d="M5 12l4.5 4.5L19 7" />,
  },
  {
    n: "04",
    title: "Measure",
    text: "Track appropriate metrics and identify opportunities to improve.",
    icon: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  },
];

export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="grain relative overflow-hidden bg-navy-900 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(46,107,255,0.25),transparent_70%)]" />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_70%)]" />

      <div className="container-x relative">
        <SectionHeading
          id="journey-title"
          align="center"
          eyebrow="From interest to inquiry"
          title={
            <>
              More than attention. <span className="text-gradient">A clearer path from interest to inquiry.</span>
            </>
          }
          intro="Good marketing looks great, and it also makes the next step obvious. We plan every piece around how real people move from discovering you to reaching out."
        />

        <div data-reveal="fade" className="group relative mt-20">
          {/* Connecting track (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[2.75rem] hidden h-px bg-white/10 lg:block" aria-hidden="true">
            <div className="h-full origin-left scale-x-0 bg-gradient-to-r from-cyan via-electric to-violet transition-transform delay-300 duration-[2.2s] ease-out-expo group-[.is-visible]:scale-x-100" />
            <span
              className="motion-loop absolute -top-[3px] left-0 h-[7px] w-16 rounded-full bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 blur-[1px] group-[.is-visible]:opacity-100"
              style={{ animation: "journey-pulse 4s 2.4s linear infinite" }}
            />
          </div>
          {/* Connecting track (mobile) */}
          <div className="absolute bottom-10 left-[2.75rem] top-10 w-px bg-white/10 lg:hidden" aria-hidden="true">
            <div className="h-full origin-top scale-y-0 bg-gradient-to-b from-cyan via-electric to-violet transition-transform delay-300 duration-[2.2s] ease-out-expo group-[.is-visible]:scale-y-100" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {stages.map((s, i) => (
              <li key={s.n} className="flex gap-6 lg:flex-col lg:items-center lg:text-center">
                <div
                  className="relative flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-950 transition-all duration-700 ease-out-expo group-[.is-visible]:border-cyan/50 group-[.is-visible]:shadow-[0_0_40px_-6px_rgba(63,214,255,0.55)]"
                  style={{ transitionDelay: `${500 + i * 450}ms` }}
                >
                  <span className="absolute inset-1.5 rounded-full bg-gradient-to-br from-electric/30 to-transparent opacity-0 transition-opacity duration-700 group-[.is-visible]:opacity-100" style={{ transitionDelay: `${500 + i * 450}ms` }} />
                  <svg viewBox="0 0 24 24" className="relative h-7 w-7 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.icon}
                  </svg>
                </div>
                <div
                  className="pt-3 opacity-0 transition-all duration-700 ease-out-expo group-[.is-visible]:translate-y-0 group-[.is-visible]:opacity-100 lg:translate-y-3 lg:pt-6"
                  style={{ transitionDelay: `${650 + i * 450}ms` }}
                >
                  <p className="font-display text-sm font-semibold text-cyan">{s.n}</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">{s.title}</h3>
                  <p className="mt-2 max-w-[17rem] leading-relaxed text-mist lg:mx-auto">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="mt-20 flex flex-col items-center gap-4 text-center">
          <BookingButton>Build my marketing strategy</BookingButton>
          <p className="max-w-md text-sm text-mist-dim">
            Every business is different, so we set expectations together in our first conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
