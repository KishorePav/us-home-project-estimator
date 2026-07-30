"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {trackEvent} from "../../analytics";
import type {Project} from "../../project-data";
import {complexityFactors,estimate,locationFactors,qualityFactors} from "../../project-data";

const money=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});
export function Estimator({project}:{project:Project}){
 const [size,setSize]=useState(project.defaultSize),[location,setLocation]=useState("US average"),[quality,setQuality]=useState("Standard"),[complexity,setComplexity]=useState("Typical"),[contingency,setContingency]=useState(10);
 const [quotes,setQuotes]=useState([{name:"Contractor A",amount:0},{name:"Contractor B",amount:0},{name:"Contractor C",amount:0}]);
 const started=useRef(false),customized=useRef(false),quoted=useRef(new Set<number>());
 const result=useMemo(()=>estimate(project,size,location,quality,complexity,contingency),[project,size,location,quality,complexity,contingency]);
 const markStarted=()=>{if(started.current)return;started.current=true;trackEvent("calculator_started",{calculator_slug:project.slug,calculator_name:project.title})};
 const setQuote=(index:number,key:"name"|"amount",value:string|number)=>{
  markStarted();
  setQuotes(old=>old.map((q,i)=>i===index?{...q,[key]:value}:q));
  if(key==="amount"&&Number(value)>0&&!quoted.current.has(index)){
   quoted.current.add(index);
   trackEvent("contractor_quote_added",{calculator_slug:project.slug,quote_position:index+1});
  }
 };
 useEffect(()=>{
  if(!started.current)return;
  const timer=window.setTimeout(()=>{
   customized.current=true;
   trackEvent("estimate_customized",{calculator_slug:project.slug,market:location,finish_level:quality,complexity,contingency_percent:contingency});
  },1200);
  return()=>window.clearTimeout(timer);
 },[project.slug,size,location,quality,complexity,contingency]);
 const printReport=()=>{
  trackEvent("estimate_report_printed",{calculator_slug:project.slug,calculator_name:project.title,quotes_added:quotes.filter(q=>q.amount>0).length,estimate_customized:customized.current});
  trackEvent("calculator_completed",{calculator_slug:project.slug,completion_method:"print_or_pdf"});
  window.setTimeout(()=>window.print(),150);
 };
 return <section className="estimator-shell"><div className="estimate-form"><div className="form-intro"><span className="step">01</span><div><h2>Describe the project</h2><p>Use approximate measurements for early planning. You can print a revised estimate later.</p></div></div>
  <label className="field"><span>Project size</span><div className="input-suffix"><input aria-label="Project size" type="number" min="1" value={size} onChange={e=>{markStarted();setSize(Number(e.target.value))}}/><span>{project.unit}</span></div></label>
  <div className="field-row split"><label className="field"><span>Local cost level</span><select value={location} onChange={e=>{markStarted();setLocation(e.target.value)}}>{Object.keys(locationFactors).map(v=><option key={v}>{v}</option>)}</select><small>Use metro pricing when labor and overhead are significantly above average.</small></label><label className="field"><span>Finish level</span><select value={quality} onChange={e=>{markStarted();setQuality(e.target.value)}}>{Object.keys(qualityFactors).map(v=><option key={v}>{v}</option>)}</select></label></div>
  <div className="field-row split"><label className="field"><span>Project complexity</span><select value={complexity} onChange={e=>{markStarted();setComplexity(e.target.value)}}>{Object.keys(complexityFactors).map(v=><option key={v}>{v}</option>)}</select></label><label className="field"><span>Planning contingency</span><div className="input-suffix"><input type="number" min="0" max="30" value={contingency} onChange={e=>{markStarted();setContingency(Number(e.target.value))}}/><span>%</span></div></label></div>
  <div className="assumption-box"><strong>What this estimate assumes</strong><ul>{project.notes.map(note=><li key={note}>{note}</li>)}</ul></div>
 </div><aside className="estimate-results" aria-live="polite"><header className="print-report-header"><div className="print-brand"><span className="print-brand-mark">HC</span><div><strong>HOME COST COMPASS</strong><small>HOME PROJECT ESTIMATE</small></div></div><div className="print-meta"><span>PLANNING REPORT</span><strong>Updated July 2026</strong></div></header><section className="print-project-summary"><div><span>PROJECT</span><strong>{project.title}</strong></div><div><span>SIZE</span><strong>{size.toLocaleString("en-US")} {project.unit}</strong></div><div><span>MARKET</span><strong>{location}</strong></div><div><span>SPECIFICATION</span><strong>{quality} · {complexity}</strong></div></section><div className="result-top"><div><span className="eyebrow">Your planning range</span><h2>{money.format(result.low)}–{money.format(result.high)}</h2><p>Typical planning point: <strong>{money.format(result.typical)}</strong></p></div><button className="print-button" onClick={printReport}>Print / Save PDF</button></div>
  <div className="range-visual"><span style={{width:"34%"}}/><i/><b/></div><div className="range-labels"><span><small>Low</small>{money.format(result.low)}</span><span><small>Typical</small>{money.format(result.typical)}</span><span><small>High</small>{money.format(result.high)}</span></div>
  <section className="breakdown"><h3>Typical cost breakdown</h3>{[["Materials & equipment",result.materials],["Labor & installation",result.labor],["Permits & fees",result.permits],["Contingency allowance",result.contingency]].map(([label,value])=><div className="breakdown-row" key={String(label)}><span>{label}</span><strong>{money.format(Number(value))}</strong></div>)}</section>
  <section className="quotes"><div><span className="eyebrow">Quote comparison</span><h3>Compare contractor quotes</h3><p>Use comparable scopes—not total price alone.</p></div>{quotes.map((quote,index)=><div className="quote-row" key={index}><input aria-label={`Contractor ${index+1} name`} value={quote.name} onChange={e=>setQuote(index,"name",e.target.value)}/><div className="input-prefix"><span>$</span><input aria-label={`${quote.name} amount`} type="number" min="0" value={quote.amount||""} placeholder="0" onChange={e=>setQuote(index,"amount",Number(e.target.value))}/></div><span className={`quote-status ${quote.amount?(quote.amount<result.low?"low":quote.amount>result.high?"high":"inside"):""}`}>{quote.amount?(quote.amount<result.low?"Below range":quote.amount>result.high?"Above range":"Within range"):"Add quote"}</span></div>)}</section>
  <div className="report-note"><strong>Questions for contractors</strong><ol><li>What exact labor, materials, demolition, cleanup, and permits are included?</li><li>Which allowances could change, and how are change orders approved?</li><li>What warranty, schedule, payment milestones, and proof of insurance apply?</li></ol></div><small className="disclaimer">Planning estimate only—not a contractor bid, appraisal, engineering opinion, or guarantee. Local conditions and scope determine actual cost.</small>
 </aside></section>
}