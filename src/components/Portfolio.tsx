"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { activeCategories, projects, type Project } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";
import { SectionHeading } from "./SectionHeading";
import { Arrow, BookingButton } from "./CtaLink";

type Filter = "All Work" | (typeof activeCategories)[number];

// Asymmetric rhythm for the grid below the featured project.
const layoutPattern = [
  "lg:col-span-7 aspect-[4/3.1]",
  "lg:col-span-5 aspect-[4/4.4]",
  "lg:col-span-5 aspect-[4/4.4]",
  "lg:col-span-7 aspect-[4/3.1]",
  "lg:col-span-12 aspect-[16/7]",
  "lg:col-span-6 aspect-[4/3.3]",
  "lg:col-span-6 aspect-[4/3.3]",
];

function ProjectMedia({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04] ${className}`}>
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <ProjectVisual visual={project.visual} />
      )}
    </div>
  );
}

function ConceptBadge() {
  return (
    <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
      Concept · placeholder
    </span>
  );
}

function ProjectCard({ project, layout, onOpen, index }: { project: Project; layout: string; onOpen: () => void; index: number }) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 2) * 120}ms` } as React.CSSProperties}
      className={`group relative col-span-12 ${layout.split(" ")[0]}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full rounded-[22px] text-left"
        aria-label={`View project details: ${project.title}`}
      >
        <div
          className={`relative w-full overflow-hidden rounded-[22px] border border-white/[0.07] bg-navy-900 ${layout.split(" ")[1]}`}
        >
          <ProjectMedia project={project} />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: `radial-gradient(80% 60% at 50% 110%, ${project.accent}55, transparent 70%)` }}
          />
          {project.placeholder && <ConceptBadge />}
          <span className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-950 opacity-0 transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:opacity-100">
            <Arrow className="-rotate-45" />
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mist-dim">
              {project.category} <span className="mx-1.5 text-white/20">/</span> {project.industry}
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-white sm:text-2xl">
              <span className="bg-gradient-to-r from-cyan to-electric bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
                {project.title}
              </span>
            </h3>
          </div>
          <span className="mt-1 hidden shrink-0 text-mist transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-white sm:block">
            <Arrow />
          </span>
        </div>
      </button>
    </article>
  );
}

function FeaturedProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article data-reveal className="group col-span-12">
      <button
        type="button"
        onClick={onOpen}
        className="grid w-full overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-900 text-left lg:grid-cols-[1.55fr_1fr]"
        aria-label={`View featured project details: ${project.title}`}
      >
        <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[560px]">
          <ProjectMedia project={project} />
          {project.placeholder && <ConceptBadge />}
        </div>
        <div className="relative flex flex-col justify-between gap-10 p-7 sm:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: `radial-gradient(90% 70% at 100% 0%, ${project.accent}22, transparent 70%)` }}
          />
          <div className="relative">
            <p className="eyebrow text-cyan">Featured project</p>
            <h3 className="mt-5 text-3xl font-semibold leading-[1.08] text-white sm:text-[2.6rem]">{project.title}</h3>
            <p className="mt-5 text-base leading-relaxed text-mist">{project.overview}</p>
          </div>
          <div className="relative">
            <dl className="grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-6 text-sm">
              <div>
                <dt className="text-mist-dim">Industry</dt>
                <dd className="mt-1 font-semibold text-white">{project.industry}</dd>
              </div>
              <div>
                <dt className="text-mist-dim">Category</dt>
                <dd className="mt-1 font-semibold text-white">{project.category}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-mist-dim">Services</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-mist">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <span className="mt-8 inline-flex items-center gap-3 font-display font-semibold text-white">
              <span className="relative">
                View case study
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-50 bg-gradient-to-r from-cyan to-electric transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              </span>
              <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!project && d.open) d.close();
  }, [project]);

  const close = () => {
    document.documentElement.style.overflow = "";
    onClose();
  };

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      aria-labelledby="project-dialog-title"
      className="project-dialog m-auto max-h-[92svh] w-[min(1100px,calc(100vw-1.5rem))] overflow-y-auto overscroll-contain rounded-[26px] border border-white/10 bg-ink-900 p-0 text-white backdrop:bg-ink-950/80 backdrop:backdrop-blur-md"
    >
      {project && (
        <div>
          <div className="relative aspect-[16/9] overflow-hidden">
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.image} alt={`${project.title} preview`} className="h-full w-full object-cover" />
            ) : (
              <ProjectVisual visual={project.visual} />
            )}
            {project.placeholder && <ConceptBadge />}
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink-950/70 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-ink-950"
              aria-label="Close project details"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mist-dim">
              {project.client} · {project.industry} · {project.category}
            </p>
            <h3 id="project-dialog-title" className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              {project.title}
            </h3>
            {project.placeholder && (
              <p className="mt-4 rounded-xl border border-cyan/25 bg-cyan/[0.06] px-4 py-3 text-sm text-mist">
                This is a concept piece that demonstrates our approach and layout. It is not client work and will be
                replaced with real projects.
              </p>
            )}
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-mist">{project.overview}</p>

            <div className="mt-10 grid gap-8 border-t border-white/[0.08] pt-8 md:grid-cols-3">
              {[
                ["The challenge", project.challenge],
                ["The strategy", project.strategy],
                ["The execution", project.execution],
              ].map(([h, t], i) => (
                <div key={h}>
                  <p className="font-display text-sm font-semibold text-cyan">0{i + 1}</p>
                  <h4 className="mt-2 text-lg font-semibold">{h}</h4>
                  <p className="mt-2 leading-relaxed text-mist">{t}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-8 border-t border-white/[0.08] pt-8 md:grid-cols-[1fr_1fr]">
              <div>
                <h4 className="text-lg font-semibold">Services provided</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <li key={s} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-mist">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Outcome</h4>
                <p className="mt-3 leading-relaxed text-mist">
                  {project.outcome ?? "Outcomes are only published once they have been verified with the client."}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <BookingButton>Discuss a project like this</BookingButton>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Visit live site <Arrow className="-rotate-45" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All Work");
  const [open, setOpen] = useState<Project | null>(null);

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const list = useMemo(() => {
    if (filter === "All Work") return projects.filter((p) => p.slug !== featured.slug);
    return projects.filter((p) => p.category === filter);
  }, [filter, featured.slug]);

  const filters: Filter[] = ["All Work", ...activeCategories];

  return (
    <section id="work" aria-labelledby="work-title" className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-royal/10 blur-[120px]" />

      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title={
              <>
                Creative that makes an impression.{" "}
                <span className="text-mist-dim">Strategy that moves business forward.</span>
              </>
            }
            intro="Explore our work across digital experiences, brand campaigns, and marketing creative."
          />
        </div>

        <div
          data-reveal
          className="-mx-5 mt-12 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0"
          role="group"
          aria-label="Filter projects by category"
        >
          <div className="flex w-max gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`min-h-11 whitespace-nowrap rounded-full border px-5 text-sm font-semibold transition-all duration-300 ${
                  filter === f
                    ? "border-white bg-white text-ink-950"
                    : "border-white/12 text-mist hover:border-white/40 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-14 lg:gap-x-8">
          {filter === "All Work" && <FeaturedProject project={featured} onOpen={() => setOpen(featured)} />}
          {list.map((p, i) => (
            <ProjectCard
              key={`${filter}-${p.slug}`}
              project={p}
              index={i}
              layout={layoutPattern[i % layoutPattern.length]}
              onOpen={() => setOpen(p)}
            />
          ))}
        </div>

        <p className="mt-14 text-sm text-mist-dim">
          Projects shown are concept pieces demonstrating our design approach while our client portfolio is being
          prepared.
        </p>
      </div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

export function PortfolioCta() {
  return (
    <div className="bg-ink-950 pb-24 sm:pb-32">
      <div className="container-x">
        <div
          data-reveal
          className="gradient-border relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[28px] bg-navy-900 p-8 sm:p-12 lg:flex-row lg:items-center"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-electric/25 blur-[90px]" />
          <div className="relative">
            <p className="font-display text-2xl font-semibold leading-tight text-white sm:text-[2rem]">
              Like what you see? Let&apos;s create something for your brand.
            </p>
            <p className="mt-2 text-mist">Tell us about your business and where you want to go next.</p>
          </div>
          <BookingButton className="relative">Discuss your project</BookingButton>
        </div>
      </div>
    </div>
  );
}
