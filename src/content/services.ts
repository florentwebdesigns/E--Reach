/** Services shown on the site. Keep descriptions to one short line. */

export type Service = {
  id: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  { id: "web", title: "Website Design", description: "Fast, professional sites built to turn visitors into calls." },
  { id: "leads", title: "Lead Generation", description: "Landing pages and funnels that bring in real inquiries." },
  { id: "social", title: "Social Media", description: "Consistent, on-brand content that keeps you visible." },
  { id: "ads", title: "Paid Ads", description: "Campaigns on Google and Meta aimed at the right people." },
  { id: "brand", title: "Branding", description: "Logos and visual identity that look the part." },
  { id: "seo", title: "SEO", description: "Help the people already searching find you first." },
];
