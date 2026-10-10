import type { ProjectVisual as VisualKey } from "@/content/projects";

/**
 * Built-in, replaceable mockup compositions for portfolio placeholders.
 * Each fills its parent. All copy inside is decorative sample design text.
 */

function Browser({ children, className = "", dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-[10px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] ${
        dark ? "border border-white/10 bg-ink-900" : "bg-white"
      } ${className}`}
    >
      <div className={`flex items-center gap-1.5 px-3 py-2 ${dark ? "border-b border-white/[0.06]" : "border-b border-black/[0.06] bg-[#f4f5f8]"}`}>
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className={`ml-3 h-3 w-1/3 rounded-full ${dark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />
      </div>
      {children}
    </div>
  );
}

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[22px] border border-white/15 bg-ink-950 p-1.5 shadow-[0_40px_70px_-25px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="relative h-full overflow-hidden rounded-[17px]">{children}</div>
    </div>
  );
}

function WebHome() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(140deg,#0c1838_0%,#08102a_50%,#0b2a4a_100%)]">
      <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" />
      <Browser className="absolute left-[7%] top-[12%] w-[72%]">
        <div className="relative aspect-[16/10] bg-[#f7f5f0] p-[5%] text-[#14213d]">
          <div className="flex items-center justify-between">
            <span className="font-display text-[clamp(8px,2.64cqw,18px)] font-bold tracking-tight">◆ HEARTH&nbsp;PRO</span>
            <span className="flex gap-3">
              <span className="h-1.5 w-8 rounded-full bg-[#14213d]/20" />
              <span className="h-1.5 w-8 rounded-full bg-[#14213d]/20" />
              <span className="h-4 w-14 rounded-full bg-[#1d4ed8]" />
            </span>
          </div>
          <div className="mt-[7%] grid grid-cols-[1.3fr_1fr] gap-[5%]">
            <div>
              <p className="font-display text-[clamp(16px,7.2cqw,56px)] font-semibold leading-[0.95] tracking-tight">
                Comfort,
                <br />
                handled.
              </p>
              <div className="mt-[8%] space-y-1.5">
                <span className="block h-1.5 w-[90%] rounded-full bg-[#14213d]/15" />
                <span className="block h-1.5 w-[70%] rounded-full bg-[#14213d]/15" />
              </div>
              <span className="mt-[8%] inline-block h-5 w-24 rounded-full bg-[#1d4ed8]" />
            </div>
            <div className="rounded-lg bg-white p-[8%] shadow-[0_10px_30px_-10px_rgba(20,33,61,0.3)]">
              <p className="text-[clamp(6px,1.8cqw,14px)] font-bold">Request a quote</p>
              {[0, 1, 2].map((i) => (
                <span key={i} className="mt-2 block h-3.5 rounded border border-[#14213d]/10 bg-[#f7f5f0]" />
              ))}
              <span className="mt-2.5 block h-4 rounded bg-[#14213d]" />
            </div>
          </div>
        </div>
      </Browser>
      <Phone className="absolute bottom-[8%] right-[7%] aspect-[9/18] w-[22%]">
        <div className="h-full bg-[#f7f5f0] p-[10%] text-[#14213d]">
          <span className="block h-1.5 w-1/2 rounded-full bg-[#14213d]/30" />
          <p className="mt-[25%] font-display text-[clamp(9px,3.12cqw,25px)] font-semibold leading-[0.95]">
            Comfort,
            <br />
            handled.
          </p>
          <span className="mt-[20%] block h-5 rounded-full bg-[#1d4ed8]" />
          <span className="mt-2 block h-12 rounded-md bg-[#14213d]/[0.06]" />
        </div>
      </Phone>
    </div>
  );
}

function SocialFitness() {
  const stories = [
    { bg: "linear-gradient(160deg,#8a63ff,#3b4dff)", line1: "MOVE", line2: "BETTER", tag: "New class" },
    { bg: "linear-gradient(160deg,#0f172a,#1e1b4b)", line1: "6AM", line2: "CREW", tag: "Member spotlight" },
    { bg: "linear-gradient(160deg,#3fd6ff,#2e6bff)", line1: "FORM", line2: "TIPS", tag: "Coach notes" },
  ];
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_100%,#2a1a66_0%,#0b0f24_60%)]">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(138,99,255,0.35),transparent_70%)]" />
      <div className="absolute inset-0 flex items-center justify-center gap-[4%]">
        {stories.map((s, i) => (
          <Phone
            key={i}
            className={`aspect-[9/17] w-[24%] ${i === 1 ? "z-10 -translate-y-[4%] scale-110" : i === 0 ? "-rotate-6" : "rotate-6"}`}
          >
            <div className="flex h-full flex-col justify-between p-[12%]" style={{ background: s.bg }}>
              <span className="w-fit rounded-full bg-white/20 px-2 py-0.5 text-[clamp(5px,1.56cqw,13px)] font-bold uppercase tracking-wider text-white">
                {s.tag}
              </span>
              <p className="font-display text-[clamp(14px,5.76cqw,48px)] font-bold leading-[0.85] tracking-tighter text-white">
                {s.line1}
                <br />
                <span className="text-white/60">{s.line2}</span>
              </p>
            </div>
          </Phone>
        ))}
      </div>
    </div>
  );
}

function BrandStudio() {
  return (
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-2 bg-[#0b1020] p-3">
      <div className="col-span-3 row-span-3 flex items-center justify-center rounded-lg bg-[#2e6bff]">
        <span className="font-display text-[clamp(28px,12.0cqw,101px)] font-bold tracking-tighter text-white">
          n<span className="text-[#0b1020]">/</span>o
        </span>
      </div>
      <div className="col-span-3 row-span-2 flex flex-col justify-between rounded-lg bg-[#f2efe8] p-[6%] text-[#0b1020]">
        <span className="font-display text-[clamp(22px,9.6cqw,84px)] font-semibold leading-none tracking-tight">Aa</span>
        <span className="text-[clamp(6px,1.8cqw,14px)] font-semibold uppercase tracking-[0.2em]">Display · Grotesk</span>
      </div>
      <div className="col-span-1 row-span-1 rounded-lg bg-[#0b1020] ring-1 ring-white/10" />
      <div className="col-span-1 row-span-1 rounded-lg bg-[#3fd6ff]" />
      <div className="col-span-1 row-span-1 rounded-lg bg-[#f2efe8]" />
      <div className="col-span-2 row-span-1 flex items-center rounded-lg bg-[#13224a] px-[8%]">
        <span className="font-display text-[clamp(9px,2.88cqw,21px)] font-bold tracking-tight text-white">
          n/o studio
        </span>
      </div>
      <div className="col-span-1 row-span-1 rounded-lg bg-[linear-gradient(135deg,#2e6bff,#3fd6ff)]" />
      <div className="col-span-3 row-span-1 flex items-center justify-between rounded-lg border border-white/10 px-[5%]">
        <span className="h-1.5 w-1/3 rounded-full bg-white/20" />
        <span className="text-[clamp(6px,1.68cqw,13px)] font-semibold uppercase tracking-[0.25em] text-mist">Guidelines v1</span>
      </div>
    </div>
  );
}

function FunnelProperty() {
  const steps = ["Your address", "Home details", "Get your estimate"];
  return (
    <div className="absolute inset-0 bg-[linear-gradient(160deg,#071c2e_0%,#08102a_60%)]">
      <div className="absolute left-1/2 top-[8%] -translate-x-1/2 text-center">
        <p className="font-display text-[clamp(14px,5.52cqw,45px)] font-semibold leading-tight tracking-tight text-white">
          What&rsquo;s your home worth?
        </p>
        <p className="mt-1 text-[clamp(7px,2.04cqw,17px)] text-mist">Three quick steps · no obligation</p>
      </div>
      <div className="absolute inset-x-[6%] bottom-[10%] top-[34%] flex items-stretch gap-[3%]">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`relative flex flex-1 flex-col rounded-xl p-[4%] ${
              i === 1 ? "bg-white text-[#0a1230] shadow-[0_30px_60px_-20px_rgba(63,214,255,0.4)]" : "border border-white/10 bg-white/[0.03] text-white"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                i === 1 ? "bg-[#2e6bff] text-white" : i === 0 ? "bg-cyan text-ink-950" : "border border-white/20"
              }`}
            >
              {i === 0 ? "✓" : i + 1}
            </span>
            <p className="mt-[12%] text-[clamp(7px,2.28cqw,18px)] font-bold">{s}</p>
            <span className={`mt-[10%] block h-4 rounded ${i === 1 ? "bg-[#0a1230]/[0.06]" : "bg-white/[0.06]"}`} />
            <span className={`mt-2 block h-4 rounded ${i === 1 ? "bg-[#0a1230]/[0.06]" : "bg-white/[0.06]"}`} />
            <span className={`mt-auto block h-5 rounded-full ${i === 1 ? "bg-[#2e6bff]" : "bg-white/[0.08]"}`} />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-[6%] top-[30%] h-px bg-gradient-to-r from-cyan via-electric to-transparent" />
    </div>
  );
}

function AdsRetail() {
  return (
    <div className="absolute inset-0 bg-[#f1ede6]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(138,99,255,0.25),transparent_55%)]" />
      <div className="absolute left-[6%] top-1/2 aspect-square w-[40%] -translate-y-1/2 overflow-hidden rounded-xl bg-[#111] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]">
        <div className="absolute left-1/2 top-[42%] aspect-[1/1.5] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-[40%_40%_12%_12%] bg-[linear-gradient(160deg,#8a63ff,#2e6bff)] shadow-[0_0_60px_rgba(138,99,255,0.6)]" />
        <p className="absolute bottom-[8%] left-[8%] font-display text-[clamp(14px,5.28cqw,42px)] font-bold leading-[0.9] tracking-tight text-white">
          The new
          <br />
          drop.
        </p>
        <span className="absolute right-[8%] top-[8%] rounded-full bg-white px-2 py-0.5 text-[clamp(5px,1.68cqw,13px)] font-bold uppercase text-black">
          Shop now
        </span>
      </div>
      <div className="absolute left-[50%] top-[10%] aspect-[9/16] w-[22%] overflow-hidden rounded-xl bg-[linear-gradient(170deg,#3b4dff,#8a63ff)] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
        <div className="absolute left-1/2 top-[38%] aspect-square w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-white/30" />
        <p className="absolute inset-x-[10%] bottom-[10%] font-display text-[clamp(10px,3.6cqw,31px)] font-bold leading-[0.9] text-white">
          Made to
          <br />
          stand out.
        </p>
      </div>
      <div className="absolute right-[5%] top-[26%] w-[18%] space-y-2">
        {["#3fd6ff", "#111", "#8a63ff"].map((c, i) => (
          <div key={i} className="flex aspect-[4/3] items-end rounded-lg p-[10%]" style={{ background: c }}>
            <span className="h-1.5 w-2/3 rounded-full bg-white/70" />
          </div>
        ))}
      </div>
    </div>
  );
}

function WebAdvisory() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(150deg,#13224a,#060a18)]">
      <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-electric/25 blur-3xl" />
      <Browser className="absolute left-[10%] right-[10%] top-[12%]" dark>
        <div className="aspect-[16/9] bg-[#0e1526] p-[5%]">
          <div className="flex items-center justify-between text-white">
            <span className="font-display text-[clamp(8px,2.4cqw,17px)] font-semibold tracking-[0.2em]">MERIDIAN</span>
            <span className="h-4 w-20 rounded-full border border-[#c8b68a]/60" />
          </div>
          <div className="mt-[8%] grid grid-cols-[1.4fr_1fr] items-end gap-[6%]">
            <p className="font-serif text-[clamp(16px,6.72cqw,53px)] leading-[1.02] text-[#f3eee3]">
              Clarity for
              <br />
              <em className="text-[#c8b68a]">complex</em> decisions.
            </p>
            <div className="space-y-2">
              <span className="block h-1.5 w-full rounded-full bg-white/15" />
              <span className="block h-1.5 w-4/5 rounded-full bg-white/15" />
              <span className="block h-1.5 w-3/5 rounded-full bg-white/15" />
            </div>
          </div>
          <div className="mt-[8%] grid grid-cols-3 gap-[3%]">
            {["Advisory", "Planning", "Strategy"].map((t) => (
              <div key={t} className="rounded-md border border-white/10 p-[8%]">
                <p className="text-[clamp(6px,1.92cqw,15px)] font-semibold text-[#f3eee3]">{t}</p>
                <span className="mt-2 block h-1 w-2/3 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </Browser>
    </div>
  );
}

const map: Record<VisualKey, () => React.ReactElement> = {
  "web-home": WebHome,
  "social-fitness": SocialFitness,
  "brand-studio": BrandStudio,
  "funnel-property": FunnelProperty,
  "ads-retail": AdsRetail,
  "web-advisory": WebAdvisory,
};

export function ProjectVisual({ visual }: { visual: VisualKey }) {
  const Comp = map[visual];
  return (
    <div className="absolute inset-0 overflow-hidden [container-type:inline-size]" aria-hidden="true">
      <Comp />
    </div>
  );
}
