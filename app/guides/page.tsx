import type {Metadata} from "next";
import Link from "next/link";
import {Footer, Header} from "../components";
import {projects} from "../project-data";
import {costGuides, getGuideDetails} from "./guide-data";
import {topicGuides} from "./topic-data";

const siteUrl="https://homecostcompass.com";
const pageUrl=`${siteUrl}/guides`;
const socialImage=`${siteUrl}/og-image.svg`;
const description="Practical US home improvement cost guides covering labor, materials, permits, budget drivers, hidden expenses and quote-planning decisions.";

export const metadata: Metadata = {
  title: "Home Improvement Cost Guides",
  description,
  alternates: {canonical: "/guides"},
  openGraph:{type:"website",siteName:"Home Cost Compass",url:pageUrl,title:"Home Improvement Cost Guides",description,images:[{url:socialImage,width:1200,height:630,alt:"Home Cost Compass cost guides"}]},
  twitter:{card:"summary_large_image",title:"Home Improvement Cost Guides",description,images:[socialImage]},
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
        <h2>Core cost guides by project</h2>
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
    <section className="calculator-section">
      <div className="section-heading">
        <p className="eyebrow">Focused planning questions</p>
        <h2>Detailed project guides</h2>
      </div>
      <div className="calculator-grid">
        {topicGuides.map((guide)=>{
          const project=projects.find((item)=>item.slug===guide.projectSlug);
          if(!project) return null;
          return <Link className="calculator-card" href={`/guides/topics/${guide.slug}`} key={guide.slug}>
            <span className="calculator-icon">{project.icon}</span>
            <div>
              <p className="card-category">{project.short}</p>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <small>{guide.readingTime}</small>
            </div>
          </Link>;
        })}
      </div>
    </section>
    <Footer/>
  </main>;
}
