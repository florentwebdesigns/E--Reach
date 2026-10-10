"use client";

import { useEffect, useRef } from "react";

/**
 * Hero composition: layered interface panels around expanding reach rings.
 * Everything here is illustrative UI. No real metrics are shown.
 * Layers drift gently with the cursor (fine pointers only) and with scroll.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let tx = 0, ty = 0, cx = 0, cy = 0, sy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      sy = Math.min(window.scrollY, 900);
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      el.style.setProperty("--sy", sy.toFixed(1));
      raf = requestAnimationFrame(tick);
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const layer = (depth: number, scroll = 0): React.CSSProperties => ({
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px + var(--sy, 0) * ${scroll}px), 0)`,
    willChange: "transform",
  });

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[1/1.02] w-full max-w-[560px] select-none"
      aria-label="Illustrative marketing dashboard, website, and social media previews"
      role="img"
    >
      {/* Reach rings */}
      <div className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2" style={layer(6)}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="motion-loop absolute left-1/2 top-1/2 aspect-square w-full animate-ring rounded-full border border-cyan/40"
            style={{ animationDelay: `${i * 2}s` }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
        <span className="absolute left-1/2 top-1/2 aspect-square w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.05]" />
        <span className="absolute left-1/2 top-1/2 aspect-square w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/25 blur-3xl" />
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 572" fill="none" aria-hidden="true" style={layer(10)}>
        <defs>
          <linearGradient id="hv-line" x1="0" y1="0" x2="560" y2="572" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3fd6ff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#3fd6ff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#8a63ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M120 430 C 200 380, 240 330, 300 300 S 430 190, 470 120"
          stroke="url(#hv-line)"
          strokeWidth="1.2"
          strokeDasharray="600"
          strokeDashoffset="600"
          style={{ animation: "dash 2.4s 1.1s var(--ease-out-expo) forwards" }}
        />
        <path
          d="M60 250 C 160 260, 220 290, 300 300 S 440 400, 520 420"
          stroke="url(#hv-line)"
          strokeWidth="1"
          strokeDasharray="600"
          strokeDashoffset="600"
          style={{ animation: "dash 2.6s 1.3s var(--ease-out-expo) forwards" }}
        />
        <circle cx="300" cy="300" r="4" fill="#3fd6ff" />
        <circle cx="300" cy="300" r="12" stroke="#3fd6ff" strokeOpacity="0.35" />
      </svg>

      {/* Main dashboard panel */}
      <div className="absolute left-[8%] top-[24%] w-[70%]" style={layer(16, -0.04)}>
        <div className="hero-rise" style={{ "--d": "700ms" } as React.CSSProperties}>
          <div className="gradient-border rounded-2xl bg-navy-900/85 p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-mist-dim">Campaign view</p>
                <p className="mt-1 font-display text-base font-semibold">Reach &amp; engagement</p>
              </div>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-mist">
                Illustrative
              </span>
            </div>
            <div className="mt-5 flex h-28 items-end gap-[6px]">
              {[38, 52, 44, 63, 58, 72, 66, 81, 76, 90, 84, 96].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 origin-bottom rounded-t-[3px] bg-gradient-to-t from-royal/50 to-cyan"
                  style={{
                    height: `${h}%`,
                    opacity: 0.35 + (i / 12) * 0.65,
                    animation: `bar-grow 1.4s ${900 + i * 50}ms var(--ease-out-expo) both`,
                  }}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-4">
              {["Reach", "Engage", "Convert"].map((label, i) => (
                <div key={label}>
                  <p className="text-[0.62rem] uppercase tracking-[0.16em] text-mist-dim">{label}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <span
                      className="block h-full origin-left rounded-full bg-gradient-to-r from-electric to-cyan"
                      style={{ width: `${88 - i * 18}%`, animation: `bar-grow 1.6s ${1200 + i * 120}ms var(--ease-out-expo) both` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Website preview */}
      <div className="absolute right-0 top-[4%] w-[46%]" style={layer(28, -0.09)}>
        <div className="hero-rise" style={{ "--d": "850ms" } as React.CSSProperties}>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="ml-2 h-2 flex-1 rounded-full bg-white/[0.05]" />
            </div>
            <div className="relative h-[118px] overflow-hidden bg-gradient-to-br from-royal via-electric to-cyan p-3">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border border-white/30" />
              <div className="h-1.5 w-10 rounded-full bg-white/70" />
              <div className="mt-5 h-3 w-[70%] rounded-full bg-white" />
              <div className="mt-1.5 h-3 w-[50%] rounded-full bg-white" />
              <div className="mt-4 inline-flex h-4 w-16 rounded-full bg-ink-950/80" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-2.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-7 rounded-md bg-white/[0.05]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social post */}
      <div className="absolute -bottom-[2%] -left-[4%] w-[36%]" style={layer(34, -0.12)}>
        <div className="hero-rise" style={{ "--d": "1000ms" } as React.CSSProperties}>
          <div className="rounded-xl border border-white/10 bg-ink-900/95 p-2.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 px-0.5 pb-2">
              <span className="h-5 w-5 rounded-full bg-gradient-to-br from-violet to-electric" />
              <span className="h-1.5 w-12 rounded-full bg-white/25" />
            </div>
            <div
              className="relative aspect-square overflow-hidden rounded-lg"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, #8a63ff, transparent 60%), radial-gradient(circle at 80% 90%, #3fd6ff, transparent 55%), #0c1838",
              }}
            >
              <span className="absolute bottom-3 left-3 font-display text-lg font-bold leading-none text-white">
                Get
                <br />
                seen.
              </span>
            </div>
            <div className="flex items-center gap-2 px-0.5 pt-2 text-mist">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-cyan" fill="currentColor" aria-hidden="true">
                <path d="M8 14s-5.5-3.3-5.5-7.2A3 3 0 0 1 8 5a3 3 0 0 1 5.5 1.8C13.5 10.7 8 14 8 14Z" />
              </svg>
              <span className="h-1.5 w-8 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry notification */}
      <div className="absolute bottom-[16%] right-[2%] w-[48%]" style={layer(22, -0.06)}>
        <div className="hero-rise" style={{ "--d": "1250ms" } as React.CSSProperties}>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-navy-800/90 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric to-cyan" style={{ animation: "pulse-node 2.8s infinite" }}>
              <svg viewBox="0 0 16 16" className="h-4 w-4 text-white" fill="none" aria-hidden="true">
                <path d="M2.5 4.5h11v7h-11zM2.5 4.5 8 9l5.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.78rem] font-semibold text-white">New inquiry</p>
              <p className="truncate text-[0.68rem] text-mist">Consultation request received</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
