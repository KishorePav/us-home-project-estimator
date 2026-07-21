import {notFound} from "next/navigation";
import Link from "next/link";
import {Footer,Header} from "../../components";
import {projects} from "../../project-data";
import {Estimator} from "./estimator";

export function generateStaticParams(){return projects.map(project=>({slug:project.slug}))}
export default async function CalculatorPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const project=projects.find(item=>item.slug===slug); if(!project)notFound();
  return <><Header/><main className="calculator-page"><div className="calculator-breadcrumb"><Link href="/#calculators">All calculators</Link><span>/</span><span>{project.title}</span></div><section className="tool-hero"><div><span className="eyebrow">{project.category} cost planner</span><h1>{project.title} Cost Calculator</h1><p>{project.description} Adjust the project, market, finish, and complexity to build a useful early budget.</p></div><div className="updated"><span>Planning data</span><strong>Updated July 2026</strong><small>US national ranges</small></div></section><Estimator project={project}/></main><Footer/></>
}
