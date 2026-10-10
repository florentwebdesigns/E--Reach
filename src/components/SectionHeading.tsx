type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, tone = "dark", align = "left", className = "", id }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-4xl ${className}`}>
      {eyebrow && (
        <p
          data-reveal
          className={`eyebrow mb-5 inline-flex items-center gap-3 ${tone === "dark" ? "text-cyan" : "text-electric"}`}
        >
          <span className={`h-px w-8 ${tone === "dark" ? "bg-cyan/60" : "bg-electric/60"}`} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        data-reveal
        style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        className={`text-[2.35rem] font-semibold leading-[1.02] sm:text-5xl lg:text-[4.1rem] ${
          tone === "dark" ? "text-white" : "text-ink-text"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          data-reveal
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${center ? "mx-auto" : ""} ${
            tone === "dark" ? "text-mist" : "text-slate-text"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
