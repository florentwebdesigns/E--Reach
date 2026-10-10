import Link from "next/link";
import { cacheLife } from "next/cache";
import { navLinks, site } from "@/content/site";
import { Logo } from "./Logo";
import { BookingButton, PhoneLink } from "./CtaLink";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => Boolean(url));
  return (
    <footer className="relative bg-ink-950 text-mist">
      <div className="h-px w-full animate-shimmer bg-[linear-gradient(90deg,transparent,#3fd6ff,#2e6bff,#8a63ff,transparent,#3fd6ff,transparent)] bg-[length:200%_100%] motion-loop" aria-hidden="true" />
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#home" className="inline-block rounded-md" aria-label="E-Reach Marketing, back to top">
              <Logo />
            </a>
            <p className="mt-6 max-w-sm leading-relaxed">{site.tagline}</p>
            <div className="mt-8">
              <BookingButton>Start a conversation</BookingButton>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-display text-sm font-semibold text-white">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.95rem]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-sm font-semibold text-white">Contact</p>
            <p className="mt-5 text-[0.95rem]">
              Phone: <PhoneLink className="font-semibold text-white hover:text-cyan" />
            </p>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4 text-sm">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="link-underline capitalize hover:text-white">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.07] pt-8 text-sm text-mist-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© <CopyrightYear /> E-Reach Marketing. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="link-underline hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
