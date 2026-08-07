import type {Metadata} from "next";
import Link from "next/link";
import {Footer, Header} from "../components";
import {categories, projects} from "../project-data";
import {costGuides, getGuideDetails} from "./guide-data";
import {topicGuides} from "./topic-data";

export const metadata: Metadata = {
  title: "Home Improvement Cost Guides",
  description: "Practical US home improvement cost guides covering labor, materials, permits, budget drivers and hidden expenses.",
  alternates: {canonical: "/guides"},
};

export default function GuidesPage(){
  return <>
    <Header/>
    <main>
      <section className="home-hero">
        <div>
          <span className="eyebrow">Home improvement planning</span>
          <h1>Plan the project before you price the project.</h1>
          <p>Clear, practical cost guides for the decisions that change a home-improvement budget: labor, materials, scope, permits, timelines and the expenses that are easy to miss.</p>
          <a className="primary-link" href="#core-guides">Browse cost guides</a>
          <div className="trust-row">
            <span>US-focused</span>
            <span>Calculator-backed</span>
            <span>No signup</span>
          </div>
        </div>
        <aside>
          <span className="mini-label">Use the guides with the calculators</span>
          <strong>Understand the number, not just the number.</strong>
          <p>Start with a realistic range, learn what moves it, then compare contractor quotes against the same scope.</p>
          <div className="hero-range">
            <span>Budget</span><i/><span>Scope</span><i/><span>Quotes</span>
          </div>
        </aside>
      </section>

      <section className="proof-strip" aria-label="Guide library summary">
        <div><strong>{costGuides.length}</strong><span>core cost guides</span></div>
        <div><strong>{topicGuides.length}</strong><span>detailed planning guides</span></div>
        <div><strong>{projects.length}</strong><span>calculator-backed projects</span></div>
        <div><strong>Free</strong><span>no account required</span></div>
      </section>

      <section id="core-guides" className="catalog">
        <div className="section-heading">
          <span className="eyebrow">Start with the complete picture</span>
          <h2>Core cost guides by project.</h2>
          <p>Choose the project you are planning for a practical overview of budget ranges, labor, materials, permits, hidden costs and quote preparation.</p>
        </div>

        {categories.map((category) => {
          const guides = costGuides.filter((guide) => {
            const project = projects.find((item) => item.slug === guide.projectSlug);
            return project?.category === category;
          });
          if (!guides.length) return null;

          return <section className="category" key={category}>
            <div className="category-title">
              <h3>{category}</h3>
              <span>{guides.length} {guides.length === 1 ? "guide" : "guides"}</span>
            </div>
            <div className="tool-grid">
              {guides.map((guide) => {
                const details = getGuideDetails(guide.projectSlug);
                if (!details) return null;
                return <Link className="tool-card" href={`/guides/${guide.slug}`} key={guide.slug}>
                  <span className="tool-icon">{details.project.icon}</span>
                  <div>
                    <h4>{guide.title}</h4>
                    <p>{details.guide.summary}</p>
                    <span className="card-link">{guide.readingTime} · Read cost guide →</span>
                  </div>
                </Link>;
              })}
            </div>
          </section>;
        })}
      </section>

      <section className="catalog">
        <div className="section-heading">
          <span className="eyebrow">Go deeper before hiring</span>
          <h2>Detailed planning guides.</h2>
          <p>Answer the questions that usually come next: cost per square foot, hidden expenses, project timelines, material choices and the scope details that change contractor quotes.</p>
        </div>

        {categories.map((category) => {
          const guides = topicGuides.filter((guide) => {
            const project = projects.find((item) => item.slug === guide.projectSlug);
            return project?.category === category;
          });
          if (!guides.length) return null;

          return <section className="category" key={category}>
            <div className="category-title">
              <h3>{category}</h3>
              <span>{guides.length} {guides.length === 1 ? "guide" : "guides"}</span>
            </div>
            <div className="tool-grid">
              {guides.map((guide) => {
                const project = projects.find((item) => item.slug === guide.projectSlug);
                if (!project) return null;
                return <Link className="tool-card" href={`/guides/topics/${guide.slug}`} key={guide.slug}>
                  <span className="tool-icon">{project.icon}</span>
                  <div>
                    <h4>{guide.title}</h4>
                    <p>{guide.description}</p>
                    <span className="card-link">{guide.readingTime} · Read guide →</span>
                  </div>
                </Link>;
              })}
            </div>
          </section>;
        })}
      </section>

      <section className="launch-value">
        <div>
          <span className="eyebrow">Turn research into a number</span>
          <h2>Use the matching calculator when you are ready to budget.</h2>
        </div>
        <div>
          <p>Every core guide connects back to a project calculator so you can move from general research to a low, typical and high planning range using your own project size and assumptions.</p>
          <Link className="primary-link" href="/#calculators">Open the calculator library</Link>
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}
