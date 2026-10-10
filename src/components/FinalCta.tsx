import { BookingButton, ButtonLink, PhoneLink } from "./CtaLink";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="grain relative overflow-hidden bg-navy-900 py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="motion-loop absolute left-[-10%] top-[-30%] h-[90%] w-[70%] animate-drift-a rounded-full bg-[radial-gradient(circle,rgba(46,107,255,0.55),transparent_65%)] blur-2xl" />
        <div className="motion-loop absolute bottom-[-40%] right-[-10%] h-[100%] w-[70%] animate-drift-b rounded-full bg-[radial-gradient(circle,rgba(63,214,255,0.35),transparent_65%)] blur-2xl" />
        <div className="motion-loop absolute left-[30%] top-[20%] h-[70%] w-[50%] animate-drift-c rounded-full bg-[radial-gradient(circle,rgba(138,99,255,0.3),transparent_65%)] blur-3xl" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_70%)]" />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="motion-loop absolute left-1/2 top-1/2 aspect-square w-[min(1100px,140vw)] animate-ring rounded-full border border-cyan/25"
            style={{ animationDelay: `${i * 2}s` }}
          />
        ))}
      </div>

      <div className="container-x relative z-10 text-center">
        <p data-reveal className="eyebrow text-cyan">Your next step</p>
        <h2 id="final-cta-title" data-reveal className="mx-auto mt-6 max-w-5xl text-[2.9rem] font-semibold leading-[0.98] text-white sm:text-7xl lg:text-[6.2rem]">
          Ready to reach your <span className="text-gradient">next level?</span>
        </h2>
        <p data-reveal className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
          Let&apos;s build a smarter digital presence and create a marketing experience designed around your business goals.
        </p>
        <div data-reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookingButton />
          <ButtonLink href="#work">Explore our work</ButtonLink>
        </div>
        <div data-reveal className="mt-8">
          <PhoneLink className="font-display text-lg font-semibold text-white transition-colors hover:text-cyan" />
        </div>
      </div>
    </section>
  );
}
