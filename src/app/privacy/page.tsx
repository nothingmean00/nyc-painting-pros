import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles estimate requests, contact details, and website analytics.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Information you provide",
    body: "When you request an estimate or contact us, we may receive your name, phone number, email address, project location, service selection, project details, and any photos or documents you choose to send.",
  },
  {
    title: "How we use it",
    body: "We use this information to respond to your request, evaluate the project, prepare an estimate, coordinate scheduling and building requirements, provide the requested service, and maintain records related to that work.",
  },
  {
    title: "Website analytics",
    body: "The website uses performance and analytics tools to understand page visits, technical performance, and which pages lead to estimate requests. These tools may process device, browser, referrer, and approximate location data according to their own privacy terms.",
  },
  {
    title: "Sharing and retention",
    body: "We do not sell personal information. We may share information with service providers that help operate the website, deliver email, analyze performance, or complete an agreed project. We retain records only as long as reasonably needed for those purposes and applicable business obligations.",
  },
  {
    title: "Your choices",
    body: "You may ask us to correct or delete contact information that is not required for an active project, completed transaction, legal obligation, or legitimate business record. You can also contact us to stop non-essential follow-up communication.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <PageHero
        eyebrow="Privacy"
        title="How we handle your information"
        subtitle="A plain-language summary of the information this website collects and how it is used when you contact us or request an estimate."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />

      <section className="container-x py-16 lg:py-24">
        <div className="max-w-3xl space-y-10">
          <p className="text-sm text-[var(--color-muted)]">
            Last updated July 10, 2026
          </p>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
                {section.body}
              </p>
            </section>
          ))}
          <section>
            <h2 className="font-display text-2xl">Contact</h2>
            <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
              Questions about this policy can be sent to{" "}
              <a className="font-semibold text-[var(--color-green-600)]" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or discussed by calling{" "}
              <a className="font-semibold text-[var(--color-green-600)]" href={site.phoneHref}>
                {site.phone}
              </a>
              . For project inquiries, use the{" "}
              <Link className="font-semibold text-[var(--color-green-600)]" href="/contact">
                estimate form
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
