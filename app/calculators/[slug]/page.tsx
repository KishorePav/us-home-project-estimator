import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {Footer, Header} from "../../components";
import {costGuides} from "../../guides/guide-data";
import {topicGuides} from "../../guides/topic-data";
import {projects} from "../../project-data";
import {projectGuides} from "../project-guides";
import {Estimator} from "./estimator";
import {CalculatorGuide} from "./guide-content";

const siteUrl = "https://homecostcompass.com";
const socialImage = `${siteUrl}/og-image.svg`;

export function generateStaticParams() {
  return projects.map((project) => ({slug: project.slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}):Promise<Metadata> {
  const {slug} = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.title} Cost Calculator (2026)`;
  const description = `Estimate 2026 ${project.title.toLowerCase()} costs by size, market, finish, and complexity. See a low-to-high range, cost breakdown, and contractor quote comparison.`;
  const pageUrl = `${siteUrl}/calculators/${project.slug}`;

  return {
    title: {absolute: title},
    description,
    alternates: {canonical: `/calculators/${project.slug}`},
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      siteName: "Home Cost Compass",
      images:[{url:socialImage,width:1200,height:630,alt:`${project.title} cost calculator`}],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images:[socialImage],
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
  const coreGuide=costGuides.find((item)=>item.projectSlug===project.slug);
  const focusedGuides=topicGuides.filter((item)=>item.projectSlug===project.slug);

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

        {(coreGuide||focusedGuides.length>0)&&(
          <section className="calculator-section">
            <div className="section-heading">
              <p className="eyebrow">Learn before requesting quotes</p>
              <h2>Cost guides for {project.title.toLowerCase()}</h2>
            </div>
            <div className="calculator-grid">
              {coreGuide&&<Link className="calculator-card" href={`/guides/${coreGuide.slug}`}>
                <span className="calculator-icon">{project.icon}</span>
                <div><h3>{coreGuide.title}</h3><p>{coreGuide.description}</p></div>
              </Link>}
              {focusedGuides.map((item)=><Link className="calculator-card" href={`/guides/topics/${item.slug}`} key={item.slug}>
                <span className="calculator-icon">{project.icon}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </Link>)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
