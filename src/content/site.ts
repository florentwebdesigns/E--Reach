/**
 * Global site settings. Edit these values to update the whole site.
 *
 * Integrations that need configuration are driven by environment variables
 * (see .env.example and README.md), so no secrets ever live in this file.
 */

export const site = {
  name: "E-Reach Marketing",
  shortName: "E-Reach",
  tagline: "Creative marketing and digital experiences built around your business goals.",
  description:
    "E-Reach Marketing helps businesses strengthen their digital presence through strategic marketing, creative execution, and conversion-focused digital experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ereachmarketing.com",
  phone: {
    display: "973-666-6492",
    href: "tel:+19736666492",
    e164: "+19736666492",
  },
  /**
   * Optional scheduling link (Calendly, Cal.com, HubSpot Meetings, etc.).
   * When set, every "Book a free consultation" button opens it.
   * When empty, those buttons scroll to the consultation request form.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  /**
   * Optional link to a public review profile (Google, Clutch, etc.).
   * The "Read client reviews" button only appears when this is set.
   */
  reviewsUrl: process.env.NEXT_PUBLIC_REVIEWS_URL ?? "",
  /** Add real profile URLs to show social icons in the footer. Leave empty to hide. */
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    tiktok: "",
    x: "",
  } as Record<string, string>,
} as const;

export const navLinks = [
  { label: "Our Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

/** Where "book" CTAs go: the booking platform if configured, otherwise the request form. */
export const bookingHref = site.bookingUrl || "#contact";
export const bookingIsExternal = Boolean(site.bookingUrl);
