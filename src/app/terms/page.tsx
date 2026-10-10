import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the E-Reach Marketing website.",
  alternates: { canonical: "/terms" },
};

// Starter terms for a marketing website. Have them reviewed by a qualified
// professional before relying on them.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="October 10, 2026">
      <p>By using this website, you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Website content</h2>
      <p>
        Content on this site is provided for general information about E-Reach Marketing and our services. Portfolio
        items marked as concepts are design demonstrations and do not represent work for actual clients.
      </p>
      <h2>No guarantees</h2>
      <p>
        Marketing results depend on many factors outside our control. Nothing on this website is a promise or
        guarantee of specific results. Any project scope, deliverables, and fees are agreed separately in writing.
      </p>
      <h2>Consultation requests</h2>
      <p>
        Submitting the consultation form sends us a request to talk. It does not create a client relationship or
        confirm an appointment until we follow up and agree on a time.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The design, text, graphics, and code of this website belong to E-Reach Marketing unless otherwise noted, and
        may not be copied without permission.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        This website is provided &ldquo;as is&rdquo;. To the extent permitted by law, E-Reach Marketing is not liable
        for any damages arising from your use of the site.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date above shows when they were last changed.</p>
    </LegalPage>
  );
}
