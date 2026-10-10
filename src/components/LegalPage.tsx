import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/content/site";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink-text">
      <header className="bg-ink-950">
        <div className="container-x flex h-20 items-center justify-between">
          <Link href="/" className="rounded-md" aria-label="E-Reach Marketing home">
            <Logo />
          </Link>
          <Link href="/#contact" className="btn btn-primary !min-h-11">
            Book a call
          </Link>
        </div>
      </header>
      <main id="main" className="container-x max-w-3xl py-16 sm:py-24">
        <p className="eyebrow text-electric">Legal</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-slate-text">Last updated {updated}</p>
        <div className="mt-10 space-y-6 leading-relaxed text-slate-text [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-text [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
        <p className="mt-16 border-t border-ink-text/10 pt-8 text-sm">
          Questions? Call us at{" "}
          <a href={site.phone.href} className="font-semibold text-electric">
            {site.phone.display}
          </a>
          .
        </p>
      </main>
    </div>
  );
}
