/**
 * Portfolio projects.
 *
 * IMPORTANT: Every project below is a CONCEPT PLACEHOLDER created to show the
 * layout. None of them represent real client work. Replace them with real
 * projects (and set `placeholder: false`) as soon as real work is available.
 *
 * To add a project: copy an entry, give it a unique `slug`, and either point
 * `image` to a file in /public/work/ or pick one of the built-in `visual`
 * compositions. Only fill in `outcome` with results you can verify.
 */

export const categories = [
  "Website Design",
  "Branding",
  "Social Media",
  "Digital Marketing",
  "Advertising Campaigns",
] as const;

export type Category = (typeof categories)[number];

export type ProjectVisual =
  | "web-home"
  | "social-fitness"
  | "brand-studio"
  | "funnel-property"
  | "ads-retail"
  | "web-advisory";

export type Project = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: Category;
  overview: string;
  services: string[];
  challenge: string;
  strategy: string;
  execution: string;
  /** Leave undefined until results are verified. */
  outcome?: string;
  liveUrl?: string;
  /** Optional real image path, e.g. "/work/project-name.jpg". Overrides `visual`. */
  image?: string;
  visual: ProjectVisual;
  /** Accent hue for hover lighting. */
  accent: string;
  featured?: boolean;
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "home-services-website",
    title: "A trust-first website for a home services brand",
    client: "Concept project",
    industry: "Home Services",
    category: "Website Design",
    overview:
      "A concept website showing how a local service business can look established online and make booking a quote effortless on any device.",
    services: ["Website Design", "Copywriting", "Lead Capture", "Local SEO foundations"],
    challenge:
      "Local service companies often compete on trust. Visitors decide within seconds whether a business feels reliable enough to call.",
    strategy:
      "Lead with reassurance and a single clear action: request a quote. Surface service areas, process, and guarantees above the fold.",
    execution:
      "A modular page system with a sticky quote CTA, service-area pages, and a short quote form designed for thumbs.",
    visual: "web-home",
    accent: "#3fd6ff",
    featured: true,
    placeholder: true,
  },
  {
    slug: "fitness-social-campaign",
    title: "Social campaign system for a boutique fitness studio",
    client: "Concept project",
    industry: "Health & Fitness",
    category: "Social Media",
    overview:
      "A concept social content system with reusable templates that keep posts, stories, and reels consistent and on-brand.",
    services: ["Social Strategy", "Content Templates", "Art Direction"],
    challenge:
      "Small studios need a steady stream of content without a full-time designer, and without every post looking different.",
    strategy:
      "Define three repeatable content pillars and a flexible template set so the team can publish quickly while staying cohesive.",
    execution:
      "Story, feed, and reel cover templates with a bold type system and color-coded pillars for class launches, member spotlights, and tips.",
    visual: "social-fitness",
    accent: "#8a63ff",
    placeholder: true,
  },
  {
    slug: "studio-brand-identity",
    title: "Brand identity for a modern creative studio",
    client: "Concept project",
    industry: "Creative Services",
    category: "Branding",
    overview:
      "A concept identity system covering logo, typography, color, and the core assets a growing brand needs on day one.",
    services: ["Brand Identity", "Visual System", "Brand Guidelines"],
    challenge:
      "A brand that looks improvised makes a business feel smaller than it is. Consistency signals professionalism.",
    strategy:
      "Build a compact, flexible system: one confident mark, a two-typeface hierarchy, and a palette that works on screen and print.",
    execution:
      "Logo suite, business stationery, social avatars, and a short guidelines document for consistent use.",
    visual: "brand-studio",
    accent: "#2e6bff",
    placeholder: true,
  },
  {
    slug: "property-lead-funnel",
    title: "Lead funnel for a real estate team",
    client: "Concept project",
    industry: "Real Estate",
    category: "Digital Marketing",
    overview:
      "A concept funnel that turns a free home-valuation offer into qualified seller conversations.",
    services: ["Funnel Strategy", "Landing Page", "Email Follow-up", "Tracking Setup"],
    challenge:
      "Generic 'contact us' pages rarely motivate homeowners. They need a specific, low-commitment reason to reach out.",
    strategy:
      "Offer clear value up front with a guided valuation request, then follow up with helpful, timely emails.",
    execution:
      "A three-step landing page, automated follow-up sequence, and conversion tracking connected to the team's CRM.",
    visual: "funnel-property",
    accent: "#3fd6ff",
    placeholder: true,
  },
  {
    slug: "retail-launch-ads",
    title: "Launch ad creative for an online retail brand",
    client: "Concept project",
    industry: "E-commerce",
    category: "Advertising Campaigns",
    overview:
      "A concept set of launch ads designed to be tested across placements, with variations for different audiences.",
    services: ["Ad Creative", "Campaign Planning", "Audience Testing"],
    challenge:
      "Launch campaigns need creative that stops the scroll and adapts across formats without losing the brand.",
    strategy:
      "Develop a hero concept, then build structured variations of hook, visual, and offer to learn what resonates.",
    execution:
      "Square, vertical, and story formats with a modular layout that makes new variations fast to produce.",
    visual: "ads-retail",
    accent: "#8a63ff",
    placeholder: true,
  },
  {
    slug: "advisory-website",
    title: "Website refresh for a professional advisory firm",
    client: "Concept project",
    industry: "Professional Services",
    category: "Website Design",
    overview:
      "A concept redesign that presents a professional firm with clarity and confidence, and makes consultations easy to request.",
    services: ["UX Strategy", "Website Design", "Content Structure"],
    challenge:
      "Expertise is hard to communicate on a cluttered site. Prospects need to understand the offer and the next step quickly.",
    strategy:
      "Organize the site around client questions, with plain-language service pages and a consultation path on every page.",
    execution:
      "An editorial layout with calm typography, structured service pages, and a short consultation request form.",
    visual: "web-advisory",
    accent: "#2e6bff",
    placeholder: true,
  },
];

/** Only show filter categories that have at least one project. */
export const activeCategories = categories.filter((c) => projects.some((p) => p.category === c));
