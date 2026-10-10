"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic hero background: slow-moving light fields, a masked grid that
 * pans gently, a horizon glow, and a soft spotlight that follows the cursor.
 */
export function HeroBackdrop() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spot.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const parent = el.parentElement!;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
        el.style.opacity = "1";
      });
    };
    parent.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_0%,#0d1b45_0%,#060a18_45%,#03050c_100%)]" />

      {/* Drifting light fields */}
      <div className="motion-loop absolute -left-[20%] -top-[30%] h-[80vh] w-[80vh] animate-drift-a rounded-full bg-[radial-gradient(circle,rgba(46,107,255,0.42),transparent_65%)] blur-2xl" />
      <div className="motion-loop absolute -right-[10%] top-[5%] h-[70vh] w-[70vh] animate-drift-b rounded-full bg-[radial-gradient(circle,rgba(63,214,255,0.22),transparent_65%)] blur-2xl" />
      <div className="motion-loop absolute bottom-[-30%] left-[30%] h-[70vh] w-[90vh] animate-drift-c rounded-full bg-[radial-gradient(circle,rgba(138,99,255,0.22),transparent_65%)] blur-3xl" />

      {/* Grid */}
      <div
        className="motion-loop bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,#000_20%,transparent_75%)]"
        style={{ animation: "grid-pan 18s linear infinite" }}
      />

      {/* Horizon glow */}
      <div className="absolute -bottom-[55%] left-1/2 h-[80%] w-[160%] -translate-x-1/2 rounded-[100%] border-t border-cyan/30 bg-[radial-gradient(ellipse_at_top,rgba(46,107,255,0.28),transparent_60%)] shadow-[0_-30px_120px_-20px_rgba(63,214,255,0.35)]" />

      {/* Cursor spotlight */}
      <div
        ref={spot}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background: "radial-gradient(520px circle at var(--x, 50%) var(--y, 40%), rgba(63,214,255,0.09), transparent 60%)",
        }}
      />
    </div>
  );
}
