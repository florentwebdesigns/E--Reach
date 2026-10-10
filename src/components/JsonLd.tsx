import { offeredServices } from "@/content/services";
import { site } from "@/content/site";

/** Structured data describing the business. Only includes verified facts. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/opengraph-image`,
    areaServed: "US",
    knowsAbout: offeredServices.map((s) => s.title),
    sameAs: Object.values(site.social).filter(Boolean),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
