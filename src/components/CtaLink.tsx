import { bookingHref, bookingIsExternal, site } from "@/content/site";

type Variant = "primary" | "ghost" | "dark" | "outline-dark";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  dark: "btn-dark",
  "outline-dark": "btn-outline-dark",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`btn-arrow h-4 w-4 ${className}`} fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M6.6 2.8 4.4 3.3a1.5 1.5 0 0 0-1.1 1.6c.6 6 5.8 11.2 11.8 11.8a1.5 1.5 0 0 0 1.6-1.1l.5-2.2a1.2 1.2 0 0 0-.7-1.4l-2.6-1.1a1.2 1.2 0 0 0-1.4.4l-.8 1.1a9.4 9.4 0 0 1-4.6-4.6l1.1-.8a1.2 1.2 0 0 0 .4-1.4L7.5 3.5a1.2 1.2 0 0 0-.9-.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Primary booking CTA: opens the scheduling link if configured, otherwise the request form. */
export function BookingButton({
  children = "Book a free consultation",
  variant = "primary",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={bookingHref}
      className={`btn ${variantClass[variant]} ${className}`}
      {...(bookingIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Arrow />
      {bookingIsExternal && <span className="sr-only">(opens scheduling page in a new tab)</span>}
    </a>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "ghost",
  className = "",
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <a href={href} className={`btn ${variantClass[variant]} ${className}`}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

export function PhoneLink({ className = "", label = true }: { className?: string; label?: boolean }) {
  return (
    <a href={site.phone.href} className={`inline-flex items-center gap-2 ${className}`}>
      <PhoneIcon />
      <span>
        {label && <span className="sr-only">Call E-Reach Marketing at </span>}
        {site.phone.display}
      </span>
    </a>
  );
}
