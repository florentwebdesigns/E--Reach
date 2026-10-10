/**
 * Shared lead-form schema and validation, used by both the browser form and
 * the /api/lead route so the rules can never drift apart.
 */

export const serviceOptions = [
  "Marketing strategy",
  "Website design",
  "Lead generation",
  "Social media",
  "Paid advertising",
  "Branding & creative",
  "SEO",
  "Landing pages",
  "Content & campaigns",
  "Analytics",
] as const;

export const goalOptions = [
  "Generate More Leads",
  "Improve Website",
  "Grow Brand Awareness",
  "Improve Social Media Presence",
  "Launch Advertising Campaigns",
  "Improve Conversion Rates",
  "Other",
] as const;

export const budgetOptions = [
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
] as const;

export type LeadInput = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  services: string[];
  goal: string;
  budget: string;
  details: string;
};

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

export const emptyLead: LeadInput = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
  services: [],
  goal: "",
  budget: "",
  details: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(v: LeadInput): LeadErrors {
  const e: LeadErrors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  else if (v.fullName.length > 100) e.fullName = "Please keep your name under 100 characters.";

  if (v.businessName.length > 120) e.businessName = "Please keep this under 120 characters.";

  if (!v.email.trim()) e.email = "Please enter your email so we can reply.";
  else if (!EMAIL.test(v.email.trim()) || v.email.length > 200) e.email = "That email doesn't look quite right.";

  const digits = v.phone.replace(/\D/g, "");
  if (v.phone.trim() && (digits.length < 10 || digits.length > 15)) e.phone = "Please enter a valid phone number, including area code.";

  if (v.website.trim()) {
    const candidate = /^https?:\/\//i.test(v.website.trim()) ? v.website.trim() : `https://${v.website.trim()}`;
    try {
      const u = new URL(candidate);
      if (!u.hostname.includes(".")) throw new Error("bad host");
    } catch {
      e.website = "Please enter a valid web address, like yourbusiness.com.";
    }
  }

  if (v.industry.length > 120) e.industry = "Please keep this under 120 characters.";

  if (!v.goal) e.goal = "Please choose the goal that fits best.";
  else if (!(goalOptions as readonly string[]).includes(v.goal)) e.goal = "Please choose an option from the list.";

  if (v.budget && !(budgetOptions as readonly string[]).includes(v.budget)) e.budget = "Please choose an option from the list.";

  if (v.services.some((s) => !(serviceOptions as readonly string[]).includes(s))) e.services = "Please choose from the listed services.";

  if (v.details.length > 3000) e.details = "Please keep additional details under 3,000 characters.";

  return e;
}

/** Coerce unknown JSON into a LeadInput with safe string types. */
export function normalizeLead(raw: unknown): LeadInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (k: keyof LeadInput) => (typeof r[k] === "string" ? (r[k] as string).slice(0, 4000) : "");
  return {
    fullName: str("fullName").trim(),
    businessName: str("businessName").trim(),
    email: str("email").trim(),
    phone: str("phone").trim(),
    website: str("website").trim(),
    industry: str("industry").trim(),
    services: Array.isArray(r.services) ? r.services.filter((s): s is string => typeof s === "string").slice(0, 20) : [],
    goal: str("goal"),
    budget: str("budget"),
    details: str("details").trim(),
  };
}
