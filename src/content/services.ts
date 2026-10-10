/**
 * Services offered by E-Reach Marketing.
 * Set `offered: false` to hide a service without deleting its copy.
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  value: string;
  tags: string[];
  offered: boolean;
};

export const services: Service[] = [
  {
    id: "strategy",
    title: "Digital Marketing Strategy",
    description:
      "A clear marketing direction built from your business goals, your audience, and the opportunities in your market.",
    value: "You know where to focus, what to prioritize, and why each move matters.",
    tags: ["Audience research", "Positioning", "Channel planning"],
    offered: true,
  },
  {
    id: "web",
    title: "Website Design & Development",
    description:
      "Professional, fast digital experiences designed to establish trust and encourage visitors to take action.",
    value: "A site that looks the part and makes it easy for the right people to reach you.",
    tags: ["UX & UI design", "Development", "Mobile-first"],
    offered: true,
  },
  {
    id: "leads",
    title: "Lead Generation",
    description:
      "Conversion-focused landing pages, lead capture experiences, and marketing funnels that guide interest toward inquiry.",
    value: "A clearer, more intentional path from first visit to first conversation.",
    tags: ["Funnels", "Lead capture", "Follow-up flows"],
    offered: true,
  },
  {
    id: "social",
    title: "Social Media Marketing",
    description:
      "A consistent, recognizable social presence through creative content and strategic planning.",
    value: "Show up regularly, look cohesive, and give followers a reason to engage.",
    tags: ["Content calendars", "Creative", "Community"],
    offered: true,
  },
  {
    id: "ads",
    title: "Paid Advertising",
    description:
      "Advertising campaigns built and managed across the digital platforms that fit your audience.",
    value: "Put your offer in front of relevant people, with spend tied to clear objectives.",
    tags: ["Meta", "Google", "Campaign management"],
    offered: true,
  },
  {
    id: "brand",
    title: "Branding & Creative",
    description:
      "Cohesive visual identities and marketing assets that communicate what makes your brand valuable.",
    value: "A brand people recognize, remember, and trust across every touchpoint.",
    tags: ["Identity", "Art direction", "Brand systems"],
    offered: true,
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    description:
      "Stronger site structure, search visibility foundations, and more discoverable content.",
    value: "Make it easier for people already searching for what you do to find you.",
    tags: ["Technical SEO", "On-page", "Local search"],
    offered: true,
  },
  {
    id: "cro",
    title: "Landing Pages & Conversion Optimization",
    description:
      "Targeted page experiences that help turn campaign traffic into inquiries and leads.",
    value: "Get more out of the attention you are already earning.",
    tags: ["Landing pages", "A/B testing", "UX audits"],
    offered: true,
  },
  {
    id: "content",
    title: "Content & Campaign Creation",
    description:
      "Campaign assets and messaging aligned with what your business is trying to achieve.",
    value: "Creative that says the right thing, to the right people, in the right format.",
    tags: ["Copywriting", "Campaign assets", "Video & motion"],
    offered: true,
  },
  {
    id: "analytics",
    title: "Marketing Analytics",
    description:
      "Measurement of meaningful campaign activity and a clear view of where to improve.",
    value: "Decisions grounded in what is actually happening, not guesswork.",
    tags: ["Tracking setup", "Dashboards", "Reporting"],
    offered: true,
  },
];

export const offeredServices = services.filter((s) => s.offered);
