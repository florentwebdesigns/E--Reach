const pillars = [
  {
    title: "Strategy with purpose",
    text: "Marketing decisions should support clear business objectives rather than simply generating activity.",
  },
  {
    title: "Creative that stands out",
    text: "Distinctive creative that communicates your brand clearly and captures attention.",
  },
  {
    title: "Built around your business",
    text: "The approach adapts to your audience, your services, your goals, and your market.",
  },
  {
    title: "Focused on conversions",
    text: "Websites, landing pages, and calls to action designed with the next customer action in mind.",
  },
  {
    title: "Clear communication",
    text: "Recommendations, deliverables, and next steps presented in a professional, understandable way.",
  },
  {
    title: "Continuous improvement",
    text: "Where analytics and campaign data are available, we use them to find opportunities for refinement.",
  },
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-[20%] top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(46,107,255,0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(138,99,255,0.14),transparent_70%)]" />

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p data-reveal className="eyebrow inline-flex items-center gap-3 text-cyan">
              <span className="h-px w-8 bg-cyan/60" aria-hidden="true" />
              Why E-Reach Marketing
            </p>
            <h2
              id="why-title"
              data-reveal
              className="mt-6 max-w-5xl text-[2.6rem] font-semibold leading-[0.98] text-white sm:text-6xl lg:text-[5.4rem]"
            >
              Your marketing should work <span className="text-gradient pr-[0.12em] italic">as hard</span> as you do.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 110}ms` } as React.CSSProperties}
              className="group relative border-t border-white/[0.1] pb-12 pt-8"
            >
              <span className="absolute -top-px left-0 h-px w-0 bg-gradient-to-r from-cyan to-electric transition-all duration-700 ease-out-expo group-hover:w-full" />
              <p className="font-display text-sm font-semibold text-mist-dim transition-colors group-hover:text-cyan">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-2xl font-semibold text-white">{p.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-mist">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
