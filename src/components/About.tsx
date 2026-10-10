const approach = [
  ["Understand the business", "What you offer, how you win work, and what makes you different."],
  ["Identify the audience", "Who you serve best, and what they need to hear to take the next step."],
  ["Build a clear strategy", "Priorities, channels, and messaging that tie back to your goals."],
  ["Create cohesive experiences", "A website, brand, and campaigns that look and feel like one business."],
  ["Make action easy", "Clear calls to action and simple ways for prospects to reach you."],
  ["Improve over time", "Refine based on your feedback and whatever data is available."],
];

/*
 * A team section can be added here once real team information is available.
 * Do not add names, bios, years in business, or credentials until confirmed.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-paper text-ink-text">
      <div className="grid lg:grid-cols-2">
        {/* Visual half */}
        <div className="grain relative min-h-[420px] overflow-hidden bg-ink-950 lg:min-h-full">
          <div className="motion-loop absolute -left-1/4 top-0 h-[120%] w-[120%] animate-drift-c bg-[conic-gradient(from_200deg_at_40%_50%,#03050c_0deg,#13224a_70deg,#2e6bff_140deg,#3fd6ff_190deg,#8a63ff_250deg,#03050c_320deg)] opacity-80 blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-70" />
          <div className="relative flex h-full flex-col justify-between p-8 sm:p-12 lg:p-16">
            <p className="eyebrow text-white/70">Our approach</p>
            <div data-reveal className="my-14">
              <p className="max-w-md font-display text-[2.2rem] font-semibold leading-[1.05] text-white sm:text-5xl">
                Understand first.
                <br />
                <span className="text-white/55">Then design,</span>
                <br />
                <span className="text-white/35">then build.</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Listen", "Plan", "Create", "Refine"].map((w) => (
                <span key={w} className="rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copy half */}
        <div className="relative px-5 py-20 sm:px-12 lg:px-16 lg:py-28 xl:px-20">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan/15 blur-[100px]" />
          <p data-reveal className="eyebrow relative inline-flex items-center gap-3 text-electric">
            <span className="h-px w-8 bg-electric/60" aria-hidden="true" />
            About E-Reach Marketing
          </p>
          <h2 id="about-title" data-reveal className="relative mt-6 text-[2.3rem] font-semibold leading-[1.02] sm:text-5xl">
            Good marketing starts with understanding the business.
          </h2>
          <p data-reveal className="relative mt-6 max-w-xl text-lg leading-relaxed text-slate-text">
            At E-Reach Marketing, the goal is to help businesses communicate their value, strengthen their digital
            presence, and create better paths for potential customers to connect with them.
          </p>

          <ol className="relative mt-12 grid gap-x-8 sm:grid-cols-2">
            {approach.map(([t, d], i) => (
              <li
                key={t}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
                className="border-t border-ink-text/10 py-5"
              >
                <p className="flex items-baseline gap-3">
                  <span className="font-display text-xs font-semibold text-electric">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-lg font-semibold">{t}</span>
                </p>
                <p className="mt-1.5 pl-7 text-[0.95rem] leading-relaxed text-slate-text">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
