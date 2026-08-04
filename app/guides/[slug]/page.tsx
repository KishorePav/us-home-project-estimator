import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {Footer, Header} from "../../components";
import {projects} from "../../project-data";
import {costGuideMap, costGuides, getGuideDetails} from "../guide-data";

const baseUrl="https://homecostcompass.com";

export function generateStaticParams(){return costGuides.map((guide)=>({slug:guide.slug}));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const guide=costGuideMap.get(slug);
  if(!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates:{canonical:`/guides/${guide.slug}`},
    openGraph:{type:"article",url:`${baseUrl}/guides/${guide.slug}`,title:guide.title,description:guide.description,publishedTime:guide.publishedAt,modifiedTime:guide.updatedAt},
  };
}

export default async function CostGuidePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const costGuide=costGuideMap.get(slug);
  if(!costGuide) notFound();
  const details=getGuideDetails(costGuide.projectSlug);
  if(!details) notFound();
  const {project,guide}=details;
  const related=guide.related.map((relatedSlug)=>projects.find((item)=>item.slug===relatedSlug)).filter((item)=>item!==undefined);
  const pageUrl=`${baseUrl}/guides/${costGuide.slug}`;
  const calculatorUrl=`${baseUrl}/calculators/${project.slug}`;
  const faqs=[
    {question:`How much does ${project.title.toLowerCase()} cost?`,answer:`Early planning costs vary with project size, market, quality and complexity. Home Cost Compass models a base range of $${project.lowRate.toLocaleString()} to $${project.highRate.toLocaleString()} per ${project.unit}, then adjusts it for those project conditions.`},
    {question:`What is included in this ${project.title.toLowerCase()} estimate?`,answer:`The planning estimate includes the typical materials, labor, permit allowance and contingency items listed in this guide. Contractor scope and local requirements can differ.`},
    {question:"Should I use this estimate as a contractor quote?",answer:"No. It is an early budgeting range. Confirm measurements, scope, permits and current local pricing with qualified professionals before committing to work."},
  ];
  const schema={"@context":"https://schema.org","@graph":[
    {"@type":"Article",headline:costGuide.title,description:costGuide.description,datePublished:costGuide.publishedAt,dateModified:costGuide.updatedAt,mainEntityOfPage:pageUrl,author:{"@type":"Organization",name:"Home Cost Compass"},publisher:{"@type":"Organization",name:"Home Cost Compass"}},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:baseUrl},{"@type":"ListItem",position:2,name:"Cost Guides",item:`${baseUrl}/guides`},{"@type":"ListItem",position:3,name:costGuide.title,item:pageUrl}]},
    {"@type":"FAQPage",mainEntity:faqs.map((faq)=>({"@type":"Question",name:faq.question,acceptedAnswer:{"@type":"Answer",text:faq.answer}}))},
  ]};

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <Header/>
    <article>
      <section className="hero compact-hero">
        <div>
          <Link href="/guides">← All cost guides</Link>
          <p className="eyebrow">{project.category} · {costGuide.readingTime}</p>
          <h1>{costGuide.title}</h1>
          <p>{guide.summary}</p>
          <Link className="primary-button" href={`/calculators/${project.slug}`}>Estimate {project.short.toLowerCase()} cost</Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading"><p className="eyebrow">Budget range</p><h2>How the early estimate is calculated</h2></div>
        <p>The calculator starts with the project size measured in {project.unit} and a planning rate of approximately ${project.lowRate.toLocaleString()} to ${project.highRate.toLocaleString()} per {project.unit}. It then adjusts the range for local market conditions, finish quality, project complexity and your selected contingency.</p>
        <p>This is a broad planning model, not a substitute for measurements, design documents or itemized contractor bids.</p>
      </section>

      <section className="content-section">
        <div className="section-heading"><p className="eyebrow">Typical scope</p><h2>What the estimate includes</h2></div>
        <ul>{guide.included.map((item)=><li key={item}>{item}</li>)}</ul>
      </section>

      <section className="content-section">
        <div className="section-heading"><p className="eyebrow">Cost drivers</p><h2>What changes the final price</h2></div>
        <ul>{guide.drivers.map((item)=><li key={item}>{item}</li>)}</ul>
        {project.notes.map((note)=><p key={note}>{note}</p>)}
      </section>

      <section className="content-section">
        <div className="section-heading"><p className="eyebrow">Budget surprises</p><h2>Expenses to watch for</h2></div>
        <ul>{guide.watchFor.map((item)=><li key={item}>{item}</li>)}</ul>
      </section>

      <section className="content-section">
        <div className="section-heading"><p className="eyebrow">Before hiring</p><h2>How to use the estimate</h2></div>
        <ol>
          <li>Use the calculator to establish a reasonable starting range.</li>
          <li>Write down exactly what is included and excluded from your desired scope.</li>
          <li>Request multiple itemized quotes using the same scope.</li>
          <li>Verify licenses, insurance, permits, warranties and payment milestones.</li>
          <li>Keep a separate contingency for concealed conditions and owner-requested changes.</li>
        </ol>
        <p><Link href={`/calculators/${project.slug}`}>Open the {project.title} calculator</Link> to test different size, quality and complexity assumptions.</p>
      </section>

      <section className="content-section">
        <div className="section-heading"><p className="eyebrow">Common questions</p><h2>{project.title} cost FAQ</h2></div>
        {faqs.map((faq)=><div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}
      </section>

      <section className="calculator-section">
        <div className="section-heading"><p className="eyebrow">Related planning</p><h2>Related home project calculators</h2></div>
        <div className="calculator-grid">{related.map((item)=><Link className="calculator-card" href={`/calculators/${item.slug}`} key={item.slug}><span className="calculator-icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></Link>)}</div>
      </section>
    </article>
    <Footer/>
  </main>;
}
