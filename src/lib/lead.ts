/**
 * Shared lead-form schema and validation, used by both the browser form and
 * the /api/lead route so the rules can never drift apart.
 */

export const helpOptions = [
  "Website",
  "Lead generation",
  "Social media",
  "Paid ads",
  "Branding",
  "SEO",
  "Not sure yet",
] as const;

export type LeadInput = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  help: string;
  details: string;
};

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

export const emptyLead: LeadInput = {
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  help: "",
  details: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(v: LeadInput): LeadErrors {
  const e: LeadErrors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your name.";
  else if (v.fullName.length > 100) e.fullName = "Please keep your name under 100 characters.";

  if (!v.email.trim()) e.email = "Please enter your email so we can reply.";
  else if (!EMAIL.test(v.email.trim()) || v.email.length > 200) e.email = "That email doesn't look quite right.";

  const digits = v.phone.replace(/\D/g, "");
  if (v.phone.trim() && (digits.length < 10 || digits.length > 15)) e.phone = "Please enter a valid phone number, including area code.";

  if (v.businessName.length > 120) e.businessName = "Please keep this under 120 characters.";

  if (!v.help) e.help = "Please choose what you need help with.";
  else if (!(helpOptions as readonly string[]).includes(v.help)) e.help = "Please choose an option from the list.";

  if (v.details.length > 3000) e.details = "Please keep your message under 3,000 characters.";

  return e;
}

/** Coerce unknown JSON into a LeadInput with safe string types. */
export function normalizeLead(raw: unknown): LeadInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (k: keyof LeadInput) => (typeof r[k] === "string" ? (r[k] as string).slice(0, 4000).trim() : "");
  return {
    fullName: str("fullName"),
    email: str("email"),
    phone: str("phone"),
    businessName: str("businessName"),
    help: str("help"),
    details: str("details"),
  };
}
