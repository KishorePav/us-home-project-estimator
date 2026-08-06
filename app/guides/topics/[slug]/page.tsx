import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {Footer,Header} from "../../../components";
import {projects} from "../../../project-data";
import {topicGuideMap,topicGuides,topicGuidePublishedAt} from "../../topic-data";

const baseUrl="https://homecostcompass.com";
const socialImage=`${baseUrl}/og-image.svg`;

export function generateStaticParams(){return topicGuides.map((guide)=>({slug:guide.slug}));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const guide=topicGuideMap.get(slug);
  if(!guide) return {};
  const pageUrl=`${baseUrl}/guides/topics/${guide.slug}`;
  return {
    title:guide.title,
    description:guide.description,
    alternates:{canonical:`/guides/topics/${guide.slug}`},
    openGraph:{type:"article",siteName:"Home Cost Compass",url:pageUrl,title:guide.title,description:guide.description,publishedTime:topicGuidePublishedAt,modifiedTime:topicGuidePublishedAt,images:[{url:socialImage,width:1200,height:630,alt:guide.title}]},
    twitter:{card:"summary_large_image",title:guide.title,description:guide.description,images:[socialImage]},
  };
}

export default async function TopicGuidePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const guide=topicGuideMap.get(slug);
  if(!guide) notFound();
  const project=projects.find((item)=>item.slug===guide.projectSlug);
  if(!project) notFound();
  const pageUrl=`${baseUrl}/guides/topics/${guide.slug}`;
  const schema={"@context":"https://schema.org","@graph":[
    {"@type":"Article",headline:guide.title,description:guide.description,datePublished:topicGuidePublishedAt,dateModified:topicGuidePublishedAt,mainEntityOfPage:pageUrl,author:{"@type":"Organization",name:"Home Cost Compass"},publisher:{"@type":"Organization",name:"Home Cost Compass"}},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:baseUrl},{"@type":"ListItem",position:2,name:"Cost Guides",item:`${baseUrl}/guides`},{"@type":"ListItem",position:3,name:guide.title,item:pageUrl}]},
    {"@type":"FAQPage",mainEntity:guide.faqs.map((faq)=>({"@type":"Question",name:faq.question,acceptedAnswer:{"@type":"Answer",text:faq.answer}}))}
  ]};
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <Header/>
    <article>
      <section className="hero compact-hero"><div>
        <Link href="/guides">← All cost guides</Link>
        <p className="eyebrow">{project.category} · {guide.readingTime}</p>
        <h1>{guide.title}</h1><p>{guide.description}</p>
        <Link className="primary-button" href={`/calculators/${project.slug}`}>Estimate {project.short.toLowerCase()} cost</Link>
      </div></section>
      {guide.sections.map((section)=><section className="content-section" key={section.heading}>
        <div className="section-heading"><h2>{section.heading}</h2></div>
        {section.paragraphs.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}
        {section.bullets&&<ul>{section.bullets.map((item)=><li key={item}>{item}</li>)}</ul>}
      </section>)}
      <section className="content-section"><div className="section-heading"><p className="eyebrow">Next step</p><h2>Build a project-specific planning range</h2></div>
        <p>Use the <Link href={`/calculators/${project.slug}`}>{project.title} Cost Calculator</Link> to test project size, market, finish quality, complexity and contingency assumptions. Then compare itemized local quotes against the same written scope.</p>
        <p>For a broader overview, read the <Link href={`/guides/${project.slug}-cost-guide`}>{project.title} Cost Guide</Link>.</p>
      </section>
      <section className="content-section"><div className="section-heading"><p className="eyebrow">Common questions</p><h2>{guide.title} FAQ</h2></div>
        {guide.faqs.map((faq)=><div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}
      </section>
    </article>
    <Footer/>
  </main>;
}
