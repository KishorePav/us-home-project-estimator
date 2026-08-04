import type {Metadata} from "next";
import Link from "next/link";
import {Footer, Header} from "../components";
import {costGuides, getGuideDetails} from "./guide-data";

export const metadata: Metadata = {
  title: "Home Improvement Cost Guides",
  description: "Practical US home improvement cost guides covering labor, materials, permits, budget drivers and hidden expenses.",
  alternates: {canonical: "/guides"},
};

export default function GuidesPage(){
  return <main>
    <Header/>
    <section className="hero compact-hero">
      <div>
        <p className="eyebrow">Home improvement planning</p>
        <h1>Home project cost guides</h1>
        <p>Understand the assumptions, cost drivers and common budget surprises behind every Home Cost Compass calculator.</p>
      </div>
    </section>
    <section className="calculator-section">
      <div className="section-heading">
        <p className="eyebrow">Plan before requesting quotes</p>
        <h2>Cost guides by project</h2>
      </div>
      <div className="calculator-grid">
        {costGuides.map((guide) => {
          const details=getGuideDetails(guide.projectSlug);
          if(!details) return null;
          return <Link className="calculator-card" href={`/guides/${guide.slug}`} key={guide.slug}>
            <span className="calculator-icon">{details.project.icon}</span>
            <div>
              <p className="card-category">{details.project.category}</p>
              <h3>{guide.title}</h3>
              <p>{details.guide.summary}</p>
              <small>{guide.readingTime}</small>
            </div>
          </Link>;
        })}
      </div>
    </section>
    <Footer/>
  </main>;
}
