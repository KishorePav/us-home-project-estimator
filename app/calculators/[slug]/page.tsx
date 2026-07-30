import Link from "next/link";
import {notFound} from "next/navigation";
import {Footer, Header} from "../../components";
import {projects} from "../../project-data";
import {projectGuides} from "../project-guides";
import {Estimator} from "./estimator";
import {CalculatorGuide} from "./guide-content";

const siteUrl = "https://homecostcompass.com";

export function generateStaticParams() {
  return projects.map((project) => ({slug: project.slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const description = `Estimate 2026 ${project.title.toLowerCase()} costs by size, market, finish, and complexity. See a low-to-high range, cost breakdown, and contractor quote comparison.`;

  return {
    title: `${project.title} Cost Calculator (2026)`,
    description,
    alternates: {canonical: `/calculators/${project.slug}`},
    openGraph: {
      type: "website",
      url: `${siteUrl}/calculators/${project.slug}`,
      title: `${project.title} Cost Calculator (2026)`,
      description,
      siteName: "Home Cost Compass",
    },
    twitter: {
      card: "summary",
      title: `${project.title} Cost Calculator (2026)`,
      description,
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const guide = projectGuides[project.slug];
  if (!guide) notFound();

  const relatedProjects = guide.related.flatMap((relatedSlug) => {
    const related = projects.find((item) => item.slug === relatedSlug);
    return related ? [related] : [];
  });

  const pageDescription = `${project.description} Build a free US planning range, understand major cost drivers, and compare contractor quotes.`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home Cost Compass",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${project.title} Cost Calculator`,
            item: `${siteUrl}/calculators/${project.slug}`,
          },
        ],
      },
      {
        "@type": "WebPage",
        name: `${project.title} Cost Calculator (2026)`,
        description: pageDescription,
        url: `${siteUrl}/calculators/${project.slug}`,
        dateModified: "2026-07-30",
        isPartOf: {
          "@type": "WebSite",
          name: "Home Cost Compass",
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="calculator-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <div className="calculator-breadcrumb">
          <Link href="/#calculators">All calculators</Link>
          <span>/</span>
          <span>{project.title}</span>
        </div>
        <section className="tool-hero">
          <div>
            <span className="eyebrow">{project.category} cost planner</span>
            <h1>{project.title} Cost Calculator</h1>
            <p>
              {project.description} Adjust the project, market, finish, and complexity to
              build a useful early budget.
            </p>
          </div>
          <div className="updated">
            <span>Planning data</span>
            <strong>Updated July 2026</strong>
            <small>US national ranges</small>
          </div>
        </section>
        <Estimator project={project} />
        <CalculatorGuide
          project={project}
          guide={guide}
          relatedProjects={relatedProjects}
        />
      </main>
      <Footer />
    </>
  );
}
