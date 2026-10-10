import { caseStudies } from "@/content/caseStudies";
import { ProjectVisual } from "./ProjectVisual";
import { SectionHeading } from "./SectionHeading";
import { BookingButton } from "./CtaLink";

export function CaseStudies() {
  return (
    <section id="results" aria-labelledby="results-title" className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      <div className="container-x relative">
        <SectionHeading
          id="results-title"
          eyebrow="Results & case studies"
          title={
            <>
              The work matters. <span className="text-mist-dim">So does the impact.</span>
            </>
          }
          intro="Every engagement is told the same honest way: the challenge, the objective, what we did, and what changed. We only publish outcomes that have been verified."
        />

        <div className="mt-20 space-y-28">
          {caseStudies.map((c, idx) => (
            <article key={c.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" aria-labelledby={`${c.slug}-title`}>
              <div className={`relative ${idx % 2 ? "lg:order-2" : ""}`}>
                <div data-reveal="mask" className="relative aspect-[4/3.2] overflow-hidden rounded-[24px] border border-white/[0.08]">
                  <ProjectVisual visual={c.visual} />
                  {c.placeholder && (
                    <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                      Concept · placeholder
                    </span>
                  )}
                </div>
              </div>

              <div className={idx % 2 ? "lg:order-1" : ""}>
                <p data-reveal className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                  {c.label} <span className="mx-1.5 text-white/25">/</span> <span className="text-mist-dim">{c.industry}</span>
                </p>
                <h3 id={`${c.slug}-title`} data-reveal className="mt-4 text-3xl font-semibold leading-[1.08] text-white sm:text-[2.5rem]">
                  {c.title}
                </h3>

                <dl className="mt-9 space-y-0">
                  {[
                    ["Challenge", c.challenge],
                    ["Objective", c.objective],
                    ["Strategy", c.strategy],
                    ["Execution", c.execution],
                  ].map(([k, v], i) => (
                    <div
                      key={k}
                      data-reveal
                      style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                      className="grid gap-1 border-t border-white/[0.08] py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
                    >
                      <dt className="font-display text-sm font-semibold text-white">{k}</dt>
                      <dd className="leading-relaxed text-mist">{v}</dd>
                    </div>
                  ))}
                  <div data-reveal className="grid gap-2 border-t border-white/[0.08] py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <dt className="font-display text-sm font-semibold text-white">Deliverables</dt>
                    <dd className="flex flex-wrap gap-2">
                      {c.deliverables.map((d) => (
                        <span key={d} className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-mist">
                          {d}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <div data-reveal className="gradient-border mt-6 rounded-2xl bg-navy-900/60 p-5">
                  <p className="font-display text-sm font-semibold text-white">Verified outcome</p>
                  {c.outcome?.length ? (
                    <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                      {c.outcome.map((o) => (
                        <li key={o.value}>
                          <p className="font-display text-3xl font-semibold text-gradient">{o.value}</p>
                          <p className="mt-1 text-sm text-mist">{o.context}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-mist">
                      Results will appear here once a real client project is complete and the numbers are confirmed.
                      We never estimate or invent performance figures.
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-24 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl font-display text-2xl font-semibold text-white sm:text-3xl">
            Want your business to be the next story here?
          </p>
          <BookingButton>Start a conversation</BookingButton>
        </div>
      </div>
    </section>
  );
}
