import { useId } from "react";

type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
  showWordmark?: boolean;
};

/**
 * E-Reach wordmark. The mark is an "E" whose middle stroke reaches past the
 * others toward a signal node: forward motion and reach in one shape.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 32" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`lm-${id}`} x1="0" y1="0" x2="40" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3b4dff" />
          <stop offset="0.55" stopColor="#2e6bff" />
          <stop offset="1" stopColor="#3fd6ff" />
        </linearGradient>
      </defs>
      <rect x="2" y="4" width="5" height="24" rx="2.5" fill={`url(#lm-${id})`} />
      <rect x="2" y="4" width="19" height="5" rx="2.5" fill={`url(#lm-${id})`} />
      <rect x="2" y="13.5" width="25" height="5" rx="2.5" fill={`url(#lm-${id})`} />
      <rect x="2" y="23" width="19" height="5" rx="2.5" fill={`url(#lm-${id})`} />
      <circle cx="34" cy="16" r="3" fill="#3fd6ff" />
      <path d="M33 7.5a11 11 0 0 1 0 17" stroke="#3fd6ff" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "light", className = "", showWordmark = true }: LogoProps) {
  const main = tone === "light" ? "text-white" : "text-ink-text";
  const sub = tone === "light" ? "text-mist" : "text-slate-text";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-auto shrink-0" />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[1.05rem] font-bold tracking-[0.08em] ${main}`}>E-REACH</span>
          <span className={`mt-1 font-display text-[0.56rem] font-semibold tracking-[0.42em] ${sub}`}>MARKETING</span>
        </span>
      )}
    </span>
  );
}
