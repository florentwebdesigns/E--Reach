import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How E-Reach Marketing collects, uses, and protects information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

// Starter policy describing what this site actually does. Have it reviewed
// by a qualified professional before relying on it.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 10, 2026">
      <p>
        This policy explains what information E-Reach Marketing (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects through
        this website and how we use it.
      </p>
      <h2>Information you give us</h2>
      <p>When you request a consultation, we collect the details you choose to provide, which may include:</p>
      <ul>
        <li>Your name, email address, phone number, and business name</li>
        <li>What you need help with, and anything else you include in your message</li>
      </ul>
      <h2>How we use it</h2>
      <p>
        We use this information only to respond to your request, schedule and prepare for a conversation, and
        communicate with you about our services. We do not sell your personal information.
      </p>
      <h2>Service providers</h2>
      <p>
        Form submissions are delivered to us through third-party services (for example, a form processing or
        scheduling provider). These providers process information on our behalf and only as needed to deliver it to us.
      </p>
      <h2>Retention</h2>
      <p>
        We keep inquiry information for as long as needed to respond and maintain a record of our communication, and
        delete it when it is no longer needed.
      </p>
      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct, or delete the information you submitted at any time by contacting us.
      </p>
      <h2>Changes</h2>
      <p>We may update this policy from time to time. The date above shows when it was last changed.</p>
    </LegalPage>
  );
}
