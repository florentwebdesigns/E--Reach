import { HeroVisual } from "./HeroVisual";
import { BookingButton, ButtonLink, PhoneLink } from "./CtaLink";
import { HeroBackdrop } from "./HeroBackdrop";

const line1 = ["Turn", "your", "online", "presence", "into"];
const line2 = ["real", "opportunities."];

const capabilities = [
  "Digital strategy",
  "Website design",
  "Lead generation",
  "Social media",
  "Paid advertising",
  "Branding & creative",
  "SEO foundations",
  "Conversion optimization",
];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="grain relative overflow-hidden bg-ink-950">
      <HeroBackdrop />

      <div className="container-x relative z-10 grid items-center gap-14 pb-16 pt-32 sm:pt-36 lg:min-h-[100svh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-28 lg:pt-32">
        <div>
          <p className="eyebrow hero-rise inline-flex items-center gap-3 text-cyan" style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className="relative flex h-2 w-2">
              <span className="motion-loop absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            E-Reach Marketing
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.9rem] font-semibold leading-[0.98] sm:text-[4.2rem] lg:text-[5.1rem] xl:text-[5.8rem]"
          >
            <span className="sr-only">Turn your online presence into real opportunities.</span>
            <span aria-hidden="true">
              {line1.map((w, idx) => (
                <span key={w} className="hero-word mr-[0.22em]">
                  <span style={{ "--i": idx } as React.CSSProperties}>{w}</span>
                </span>
              ))}
              <span className="hero-word">
                <span className="text-gradient pr-[0.04em]" style={{ "--i": line1.length } as React.CSSProperties}>
                  {line2.join(" ")}
                </span>
              </span>
            </span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-xl text-lg leading-relaxed text-mist sm:text-xl"
            style={{ "--d": "850ms" } as React.CSSProperties}
          >
            Strategic marketing, creative execution, and conversion-focused digital experiences designed to help your
            business reach more of the right people.
          </p>

          <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "1000ms" } as React.CSSProperties}>
            <BookingButton />
            <ButtonLink href="#work" variant="ghost">
              Explore our work
            </ButtonLink>
          </div>

          <div
            className="hero-rise mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mist"
            style={{ "--d": "1150ms" } as React.CSSProperties}
          >
            <span>Let&apos;s talk about your next stage of growth.</span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden="true" />
            <PhoneLink className="font-semibold text-white transition-colors hover:text-cyan" />
          </div>
        </div>

        <div className="relative hidden sm:block">
          <HeroVisual />
        </div>
      </div>

      {/* Capabilities ticker (services, not client logos) */}
      <div className="relative z-10 border-y border-white/[0.06] bg-ink-950/40 py-5 backdrop-blur-sm">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <ul className="motion-loop flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-label="What we do">
            {[...capabilities, ...capabilities].map((c, idx) => (
              <li
                key={idx}
                aria-hidden={idx >= capabilities.length ? "true" : undefined}
                className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.2em] text-mist-dim"
              >
                {c}
                <span className="h-1 w-1 rounded-full bg-cyan/70" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
