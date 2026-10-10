/**
 * Client reviews.
 *
 * TRUST RULE: Only publish real reviews from real clients, with permission.
 * The entries below are PLACEHOLDERS (placeholder: true) and render with a
 * visible "Placeholder" label so they can never be mistaken for real
 * testimonials. Replace them with verified reviews and set placeholder: false.
 *
 * Only set `rating` if it comes from a verified source, and add `sourceUrl`
 * when the review is published on a platform such as Google.
 */

export type Review = {
  id: string;
  quote: string;
  name: string;
  company: string;
  industry: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  photo?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  placeholder: boolean;
};

export const reviews: Review[] = [
  {
    id: "placeholder-1",
    quote:
      "Featured client review goes here. Replace this text with a verified testimonial that describes the experience of working with E-Reach Marketing.",
    name: "Client name",
    company: "Company name",
    industry: "Industry",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    quote:
      "Supporting review placeholder. Add a real client's words about communication, creative quality, or the project process.",
    name: "Client name",
    company: "Company name",
    industry: "Industry",
    placeholder: true,
  },
  {
    id: "placeholder-3",
    quote:
      "Supporting review placeholder. Only publish reviews that clients have approved, with a link to the original source if available.",
    name: "Client name",
    company: "Company name",
    industry: "Industry",
    placeholder: true,
  },
];
