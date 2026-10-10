# E-Reach Marketing website

Marketing site for E-Reach Marketing, built with Next.js (App Router), TypeScript, and Tailwind CSS v4. Ready to deploy on Vercel.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev                  # http://localhost:3000
npm run build                # production build check
```

## Environment variables

| Variable | Required | What it does |
| --- | --- | --- |
| `FORMSPREE_FORM_ID` | One of these two | Formspree form id. Leads are emailed to you by Formspree. |
| `LEAD_WEBHOOK_URL` | One of these two | Any HTTPS webhook (Zapier, Make, HubSpot, CRM). Receives the lead as JSON. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your live domain, for canonical links, sitemap, and social previews. |
| `NEXT_PUBLIC_BOOKING_URL` | Optional | Calendly / Cal.com link. "Book a free consultation" buttons open it. |
| `NEXT_PUBLIC_REVIEWS_URL` | Optional | Google or other review profile. Adds a "Read client reviews" button. |

Until `FORMSPREE_FORM_ID` or `LEAD_WEBHOOK_URL` is set, the consultation form does not pretend to work: it shows a clear message asking visitors to call 973-666-6492.

### Setting up Formspree (simplest)

1. Create a free form at formspree.io and copy its id (the part after `/f/`).
2. In Vercel, add `FORMSPREE_FORM_ID` under Project → Settings → Environment Variables.
3. Redeploy, submit a test, and confirm the email arrives.

## How the lead form works

- `src/components/LeadForm.tsx` validates in the browser, then posts to `/api/lead`.
- `src/app/api/lead/route.ts` re-validates on the server, checks a hidden honeypot field and a minimum fill time, applies a basic rate limit, and forwards the lead. It only returns success when the destination accepts it.
- Validation rules live in `src/lib/lead.ts` and are shared by both sides.

## Editing content

All content is structured data, so sections update without touching layout code:

| File | Content |
| --- | --- |
| `src/content/site.ts` | Business name, phone, nav links, social links |
| `src/content/services.ts` | Services (set `offered: false` to hide one) |
| `src/content/projects.ts` | Portfolio projects and filter categories |
| `src/content/caseStudies.ts` | Results / case studies |
| `src/content/reviews.ts` | Client reviews |

### Placeholders that must be replaced

To keep the site honest, nothing about clients, results, or reviews is invented:

- **Portfolio and case studies** are labeled "Concept · placeholder". Replace them with real projects, add images to `public/work/`, and set `placeholder: false`. Only fill in `outcome` with verified results.
- **Reviews** are labeled "Placeholder · not a real review". Replace with real, approved client reviews and set `placeholder: false`. Only add `rating` when it comes from a verified source.
- **Privacy Policy and Terms** (`src/app/privacy`, `src/app/terms`) are starter templates. Have them reviewed.
- **About** contains no team, founding story, or credentials. Add a team section once real details are confirmed.

## Accessibility and motion

Semantic landmarks, skip link, visible focus states, labelled form controls with inline errors, keyboard-friendly dialog and menu, and full `prefers-reduced-motion` support (all animation stops and content stays visible). Scroll reveals only hide content once JavaScript has loaded.
