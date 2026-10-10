/**
 * Case studies for the "Results" section.
 *
 * These are FRAMEWORK PLACEHOLDERS that show how a real case study will be
 * told. Replace with real projects. Only add `outcome` metrics that are
 * verified, and give them context (timeframe, baseline, source).
 */

import type { ProjectVisual } from "./projects";

export type CaseStudy = {
  slug: string;
  label: string;
  title: string;
  industry: string;
  challenge: string;
  objective: string;
  strategy: string;
  execution: string;
  deliverables: string[];
  outcome?: { value: string; context: string }[];
  visual: ProjectVisual;
  placeholder: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "case-local-service",
    label: "Case study framework",
    title: "Giving a local service business a digital front door",
    industry: "Home Services · Concept",
    challenge:
      "An outdated website and inconsistent listings made a capable business look smaller and harder to contact than it really was.",
    objective: "Make the business look established online and make requesting a quote fast on mobile.",
    strategy:
      "Rebuild the site around one action, unify the brand across listings and social profiles, and add tracking to see where inquiries come from.",
    execution:
      "New website and quote flow, refreshed visual identity, updated business profiles, and a simple monthly reporting view.",
    deliverables: ["Website", "Quote request flow", "Brand refresh", "Listing cleanup", "Analytics setup"],
    visual: "web-home",
    placeholder: true,
  },
  {
    slug: "case-campaign",
    label: "Case study framework",
    title: "Launching a campaign with creative built for testing",
    industry: "E-commerce · Concept",
    challenge:
      "A new product line needed awareness quickly, but there was no clear sense of which message would land with which audience.",
    objective: "Introduce the launch to relevant audiences and learn which creative direction to scale.",
    strategy:
      "Develop one strong hero concept, then structured variations of hook and visual, with a focused landing page to capture interest.",
    execution:
      "Multi-format ad set, launch landing page, email capture, and a testing plan with clear decision points.",
    deliverables: ["Ad creative set", "Landing page", "Email capture", "Testing plan"],
    visual: "ads-retail",
    placeholder: true,
  },
];
