export type Project = {
  slug: string; title: string; short: string; category: string; unit: string; defaultSize: number;
  lowRate: number; highRate: number; materialShare: number; permitShare: number;
  description: string; icon: string; notes: string[];
};

export const projects: Project[] = [
  {slug:"kitchen-remodel",title:"Kitchen Remodel",short:"Kitchen",category:"Remodeling",unit:"sq ft",defaultSize:200,lowRate:75,highRate:250,materialShare:.48,permitShare:.03,icon:"KT",description:"Plan cabinetry, counters, appliances, finishes, labor, and permits.",notes:["Cabinet layout and appliance choices are major cost drivers.","Structural changes and utility relocation are not included by default."]},
  {slug:"bathroom-remodel",title:"Bathroom Remodel",short:"Bathroom",category:"Remodeling",unit:"sq ft",defaultSize:60,lowRate:120,highRate:300,materialShare:.43,permitShare:.04,icon:"BA",description:"Estimate a cosmetic refresh or a more involved bathroom renovation.",notes:["Keeping fixtures in place generally lowers plumbing costs.","Waterproofing and hidden damage can change the final price."]},
  {slug:"roof-replacement",title:"Roof Replacement",short:"Roof",category:"Exterior",unit:"sq ft",defaultSize:2000,lowRate:4.5,highRate:11,materialShare:.46,permitShare:.025,icon:"RF",description:"Estimate tear-off and replacement for a typical asphalt-shingle roof.",notes:["Use sloped roof area, not only the home footprint.","Decking repairs and specialty roofing materials are excluded."]},
  {slug:"flooring",title:"Flooring Installation",short:"Flooring",category:"Interior",unit:"sq ft",defaultSize:1000,lowRate:4,highRate:16,materialShare:.55,permitShare:0,icon:"FL",description:"Compare installed flooring costs across project sizes and finish levels.",notes:["Subfloor repair and furniture moving may cost extra.","Material waste is included in the planning contingency."]},
  {slug:"interior-painting",title:"Interior Painting",short:"Painting",category:"Interior",unit:"sq ft of floor area",defaultSize:1500,lowRate:2.2,highRate:6.5,materialShare:.22,permitShare:0,icon:"PT",description:"Plan labor, paint, preparation, and a realistic contingency.",notes:["Rates assume walls and standard ceilings.","Major drywall repair, trim restoration, and lead abatement are excluded."]},
  {slug:"hvac-replacement",title:"HVAC Replacement",short:"HVAC",category:"Home systems",unit:"home sq ft",defaultSize:1800,lowRate:4.2,highRate:9.5,materialShare:.62,permitShare:.04,icon:"HV",description:"Estimate central heating and cooling equipment replacement.",notes:["Duct replacement and electrical service upgrades may be separate.","Final sizing should use a professional load calculation."]},
  {slug:"electrical-work",title:"Electrical Work",short:"Electrical",category:"Home systems",unit:"project points",defaultSize:12,lowRate:180,highRate:650,materialShare:.28,permitShare:.06,icon:"EL",description:"Budget outlets, circuits, fixtures, and typical residential electrical work.",notes:["One point represents a typical outlet, fixture, or circuit task.","Panel and service upgrades require a contractor-specific quote."]},
  {slug:"plumbing",title:"Plumbing Work",short:"Plumbing",category:"Home systems",unit:"fixtures or tasks",defaultSize:5,lowRate:350,highRate:1500,materialShare:.34,permitShare:.05,icon:"PL",description:"Plan common fixture replacements and residential plumbing tasks.",notes:["Opening and restoring walls or floors may be additional.","Sewer, septic, and whole-home repiping need dedicated quotes."]},
  {slug:"fence-installation",title:"Fence Installation",short:"Fence",category:"Exterior",unit:"linear ft",defaultSize:180,lowRate:22,highRate:65,materialShare:.56,permitShare:.02,icon:"FN",description:"Estimate installed fencing with labor, material, gates, and contingency.",notes:["Surveying, difficult access, and demolition can add cost.","Confirm property lines and local height rules before building."]},
  {slug:"deck-construction",title:"Deck Construction",short:"Deck",category:"Exterior",unit:"sq ft",defaultSize:300,lowRate:30,highRate:85,materialShare:.57,permitShare:.04,icon:"DK",description:"Plan a new ground-level or elevated residential deck.",notes:["Stairs, railings, height, and foundation conditions affect price.","Rates assume a professionally installed code-compliant deck."]},
  {slug:"solar-savings",title:"Solar Cost & Savings",short:"Solar",category:"Energy",unit:"kW system",defaultSize:8,lowRate:2600,highRate:3600,materialShare:.68,permitShare:.03,icon:"SO",description:"Estimate gross system cost and a simple long-term savings range.",notes:["Incentives are not deducted because eligibility changes by location.","Get site-specific production, utility, financing, and tax advice."]},
  {slug:"whole-home-renovation",title:"Whole-Home Renovation",short:"Whole home",category:"Remodeling",unit:"sq ft",defaultSize:1800,lowRate:35,highRate:160,materialShare:.44,permitShare:.04,icon:"WH",description:"Set an early budget range for a multi-room renovation.",notes:["The range spans light updates through extensive remodeling.","Additions, foundation work, and major structural repair are excluded."]},
  {slug:"window-replacement",title:"Window Replacement",short:"Windows",category:"Exterior",unit:"windows",defaultSize:12,lowRate:550,highRate:1800,materialShare:.61,permitShare:.02,icon:"WN",description:"Estimate installed replacement windows by count and quality level.",notes:["Custom sizes, rot repair, and historic openings increase costs.","Rates assume standard replacement rather than new-construction openings."]},
  {slug:"concrete-patio",title:"Concrete Slab or Patio",short:"Concrete",category:"Exterior",unit:"sq ft",defaultSize:400,lowRate:8,highRate:22,materialShare:.48,permitShare:.025,icon:"CN",description:"Plan a basic slab, patio, or similar flatwork project.",notes:["Demolition, pumping, drainage, and difficult access may be extra.","Structural foundations require engineered project pricing."]},
];

export const categories = ["Remodeling","Interior","Exterior","Home systems","Energy"];
export const locationFactors: Record<string,number> = {"Lower-cost market":.88,"US average":1,"Higher-cost metro":1.22,"Very high-cost metro":1.42};
export const qualityFactors: Record<string,number> = {"Budget":.82,"Standard":1,"Premium":1.38};
export const complexityFactors: Record<string,number> = {"Straightforward":.9,"Typical":1,"Complex":1.25};

export function estimate(project: Project,size:number,location:string,quality:string,complexity:string,contingency:number){
  const factor=(locationFactors[location]||1)*(qualityFactors[quality]||1)*(complexityFactors[complexity]||1);
  const lowBase=Math.max(0,size)*project.lowRate*factor;
  const highBase=Math.max(0,size)*project.highRate*factor;
  const low=lowBase*(1+contingency/100), high=highBase*(1+contingency/100), typical=(low+high)/2;
  const materials=typical*project.materialShare, permits=typical*project.permitShare, labor=typical-materials-permits;
  return {low,high,typical,materials,permits,labor,contingency:typical*contingency/(100+contingency)};
}
