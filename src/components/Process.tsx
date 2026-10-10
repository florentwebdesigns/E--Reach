"use client";

import { useEffect, useRef } from "react";
import { BookingButton } from "./CtaLink";
import { SectionHeading } from "./SectionHeading";

const steps = [
  ["Discovery", "Learn about the business, audience, current marketing, and objectives."],
  ["Strategy", "Identify the right services, creative direction, and project priorities."],
  ["Execution", "Develop the agreed website, creative, campaign, or marketing deliverables."],
  ["Review & refine", "Review the work together, gather feedback, and make appropriate improvements."],
];

export function Process() {
  const track = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  // Glowing line that fills as the timeline scrolls through the viewport.
  useEffect(() => {
    const t = track.current;
    const f = fill.current;
    if (!t || !f) return;
    let raf = 0;
    const update = () => {
      const r = t.getBoundingClientRect();
      const start = window.innerHeight * 0.65;
      const progress = Math.min(1, Math.max(0, (start - r.top) / r.height));
      f.style.transform = `scaleY(${progress})`;
      t.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => {
        const sr = el.getBoundingClientRect();
        el.classList.toggle("is-lit", sr.top < start);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(46,107,255,0.16),transparent_65%)]" />

      <div className="container-x relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="process-title"
            eyebrow="The process"
            title="From first conversation to launch."
            intro="A simple, transparent process so you always know what's happening and what comes next."
          />
          <div data-reveal className="mt-9">
            <BookingButton>Let&apos;s get started</BookingButton>
          </div>
        </div>

        <ol ref={track} className="relative pl-14 sm:pl-20">
          <div className="absolute bottom-2 left-[1.15rem] top-2 w-px bg-white/10 sm:left-[1.65rem]" aria-hidden="true">
            <div
              ref={fill}
              className="h-full origin-top bg-gradient-to-b from-cyan via-electric to-violet shadow-[0_0_14px_rgba(63,214,255,0.7)]"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
          {steps.map(([title, text], i) => (
            <li key={title} data-step className="group relative pb-16 last:pb-0">
              <span
                className="absolute -left-14 top-0 flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full border border-white/15 bg-ink-950 font-display text-xs font-semibold text-mist transition-all duration-700 ease-out-expo group-[.is-lit]:border-cyan group-[.is-lit]:text-white group-[.is-lit]:shadow-[0_0_24px_rgba(63,214,255,0.55)] sm:-left-20 sm:h-[3.4rem] sm:w-[3.4rem] sm:text-sm"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="opacity-50 transition-opacity duration-700 group-[.is-lit]:opacity-100">
                <p className="font-display text-sm font-semibold text-cyan">Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-3xl font-semibold text-white sm:text-[2.6rem]">{title}</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-mist">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
