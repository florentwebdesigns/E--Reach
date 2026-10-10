"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Arrow, PhoneLink } from "./CtaLink";
import { bookingHref, bookingIsExternal, navLinks } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const external = bookingIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-out-expo ${
          scrolled
            ? "border-b border-white/[0.07] bg-ink-950/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-expo ${
            scrolled ? "h-[68px]" : "h-[84px]"
          }`}
        >
          <a href="#home" className="relative z-10 shrink-0 rounded-md" aria-label="E-Reach Marketing, back to top">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition-colors ${
                    active === link.href ? "text-white" : "text-mist hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gradient-to-r from-cyan to-electric transition-transform duration-500 ease-out-expo ${
                      active === link.href ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={bookingHref}
              {...external}
              className={`btn btn-primary hidden sm:inline-flex ${scrolled ? "!min-h-11" : ""}`}
            >
              Book a call
              <Arrow />
            </a>
            <button
              ref={menuButton}
              type="button"
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-500 ease-out-expo ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-5 bg-white transition-all duration-500 ease-out-expo ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-ink-950/[0.97] backdrop-blur-xl transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ zIndex: -1 }}
        aria-hidden={!open}
      >
        <div className="pointer-events-none absolute -right-1/3 top-0 h-[60vh] w-[90vw] rounded-full bg-electric/25 blur-[100px]" />
        <div className="container-x relative flex h-full flex-col pb-8 pt-28">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className={`border-b border-white/[0.07] transition-all duration-700 ease-out-expo ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-[1.7rem] font-medium tracking-tight"
                >
                  {link.label}
                  <span className="font-sans text-xs text-mist-dim">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div
            className={`mt-auto flex flex-col gap-3 transition-all delay-300 duration-700 ease-out-expo ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <a
              href={bookingHref}
              {...external}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              Book a free consultation
              <Arrow />
            </a>
            <PhoneLink className="btn btn-ghost w-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
