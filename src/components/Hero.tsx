import { HeroVisual } from "./HeroVisual";
import { BookingButton, ButtonLink, PhoneLink } from "./CtaLink";
import { HeroBackdrop } from "./HeroBackdrop";

const line1 = ["Turn", "your", "online", "presence", "into"];
const line2 = ["real", "opportunities."];

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
            className="mt-6 text-[2.9rem] font-semibold leading-[0.98] sm:text-[4.2rem] lg:text-[4.7rem] xl:text-[5.4rem]"
          >
            <span className="sr-only">Turn your online presence into real opportunities.</span>
            <span aria-hidden="true">
              {line1.map((w, idx) => (
                <span key={w} className="hero-word mr-[0.22em]">
                  <span style={{ "--i": idx } as React.CSSProperties}>{w}</span>
                </span>
              ))}
              {line2.map((w, idx) => (
                <span key={w} className="hero-word mr-[0.22em]">
                  <span
                    className="bg-clip-text pr-[0.04em] text-transparent"
                    style={
                      {
                        "--i": idx + line1.length,
                        backgroundImage:
                          idx === 0
                            ? "linear-gradient(100deg, #e6f8ff, #7fe3ff 55%, #3fd6ff)"
                            : "linear-gradient(100deg, #3fd6ff, #2e6bff 60%, #8a63ff)",
                      } as React.CSSProperties
                    }
                  >
                    {w}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-xl text-lg leading-relaxed text-mist sm:text-xl"
            style={{ "--d": "850ms" } as React.CSSProperties}
          >
            Websites, campaigns, and creative that help the right people find you and book a call.
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
            <span>Prefer to talk now?</span>
            <PhoneLink className="font-semibold text-white transition-colors hover:text-cyan" />
          </div>
        </div>

        <div className="relative hidden sm:block">
          <HeroVisual />
        </div>
      </div>

    </section>
  );
}
