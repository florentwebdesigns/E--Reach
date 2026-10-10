"use client";

import { useState } from "react";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Arrow, BookingButton } from "./CtaLink";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" className={`h-4 w-4 ${i < rating ? "text-cyan" : "text-white/15"}`} fill="currentColor" aria-hidden="true">
          <path d="M8 1.5l1.9 4 4.4.5-3.3 3 .9 4.3L8 11.1l-3.9 2.2.9-4.3-3.3-3 4.4-.5z" />
        </svg>
      ))}
    </div>
  );
}

function PlaceholderTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/25 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-mist">
      Placeholder · not a real review
    </span>
  );
}

export function Reviews() {
  const [active, setActive] = useState(0);
  const featured = reviews[active];
  const others = reviews.filter((_, i) => i !== active).slice(0, 2);
  const go = (d: number) => setActive((a) => (a + d + reviews.length) % reviews.length);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden bg-navy-900 py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] bg-[radial-gradient(circle_at_top_right,rgba(63,214,255,0.12),transparent_60%)]" />

      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="reviews-title"
            eyebrow="Client experiences"
            title="Good work. Strong partnerships."
            intro="What it's like to work with us, in our clients' own words. We only publish genuine reviews shared with permission."
          />
          {reviews.length > 1 && (
            <div data-reveal className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan hover:text-cyan"
                aria-label="Previous review"
              >
                <Arrow className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan hover:text-cyan"
                aria-label="Next review"
              >
                <Arrow />
              </button>
            </div>
          )}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Featured */}
          <figure
            data-reveal
            className={`relative overflow-hidden rounded-[28px] bg-ink-950/60 p-8 sm:p-12 ${
              featured.placeholder ? "border border-dashed border-white/20" : "gradient-border"
            }`}
          >
            <span
              className="pointer-events-none absolute right-8 top-6 hidden select-none sm:block font-serif text-[11rem] leading-[0.8] text-gradient opacity-30 sm:right-12"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <div key={featured.id} className="relative" style={{ animation: "rise 0.8s var(--ease-out-expo) both" }}>
              <div className="flex flex-wrap items-center gap-3">
                {featured.placeholder && <PlaceholderTag />}
                {featured.rating && !featured.placeholder && <Stars rating={featured.rating} />}
              </div>
              <blockquote className={`mt-8 font-display text-2xl font-medium leading-snug sm:text-[2rem] ${featured.placeholder ? "text-mist" : "text-white"}`}>
                <p>&ldquo;{featured.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-white/[0.08] pt-6">
                {featured.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.photo} alt={featured.name} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-white/25 text-xs text-mist-dim" aria-hidden="true">
                    Photo
                  </span>
                )}
                <div>
                  <p className="font-semibold text-white">{featured.name}</p>
                  <p className="text-sm text-mist">
                    {featured.company} · {featured.industry}
                  </p>
                </div>
                {featured.sourceUrl && (
                  <a href={featured.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-underline ml-auto text-sm text-cyan">
                    {featured.sourceLabel ?? "View original review"}
                  </a>
                )}
              </figcaption>
            </div>
          </figure>

          {/* Supporting */}
          <div className="grid gap-6">
            {others.map((r, i) => (
              <figure
                key={r.id}
                data-reveal
                style={{ "--reveal-delay": `${120 + i * 100}ms` } as React.CSSProperties}
                className={`rounded-[22px] bg-ink-950/40 p-7 ${r.placeholder ? "border border-dashed border-white/15" : "border border-white/[0.08]"}`}
              >
                {r.placeholder && <PlaceholderTag />}
                {r.rating && !r.placeholder && <Stars rating={r.rating} />}
                <blockquote className="mt-5 leading-relaxed text-mist">
                  <p>&ldquo;{r.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-white">{r.name}</span>
                  <span className="text-mist-dim"> · {r.company}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {reviews.length > 1 && (
          <div className="mt-8 flex justify-center gap-2" role="group" aria-label="Choose a review">
            {reviews.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show review ${i + 1}`}
                aria-pressed={i === active}
                className="flex h-8 items-center px-1"
              >
                <span className={`block h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-cyan" : "w-3 bg-white/20"}`} />
              </button>
            ))}
          </div>
        )}

        <div data-reveal className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookingButton>Let&apos;s grow your brand</BookingButton>
          {site.reviewsUrl && (
            <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Read client reviews <Arrow className="-rotate-45" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
