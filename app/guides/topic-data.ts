export type TopicSection={heading:string;paragraphs:string[];bullets?:string[]};
export type TopicGuide={slug:string;projectSlug:string;title:string;description:string;readingTime:string;sections:TopicSection[];faqs:{question:string;answer:string}[]};

const published="2026-08-05";

export const topicGuides:TopicGuide[]=[
  {
    slug:"kitchen-remodel-cost-per-square-foot",projectSlug:"kitchen-remodel",title:"Kitchen Remodel Cost per Square Foot",description:"Understand how kitchen remodel cost per square foot changes with cabinetry, layout, appliances, finishes and utility work.",readingTime:"7 min read",
    sections:[
      {heading:"Why cost per square foot is only a starting point",paragraphs:["Kitchen work is driven less by open floor area than many other projects. Cabinets, appliances, counters, plumbing and electrical scope can make two kitchens of the same size cost very different amounts."]},
      {heading:"What usually pushes the rate higher",paragraphs:["The most expensive decisions are often concentrated in a small part of the room."],bullets:["Custom or semi-custom cabinetry","Premium counters and appliance packages","Moving sinks, gas lines or electrical circuits","Structural changes and wall removal","Detailed tile, lighting and finish work"]},
      {heading:"How to use a square-foot estimate",paragraphs:["Use the rate to establish an early range, then replace allowances with actual cabinet, countertop, appliance and trade quotes as the design develops."]}
    ],faqs:[{question:"Is a larger kitchen always more expensive per square foot?",answer:"Not necessarily. Larger kitchens can spread fixed design and trade costs over more area, while small luxury kitchens can have very high costs per square foot."},{question:"Does the rate include appliances?",answer:"Only when the planning scope includes an appliance allowance. Confirm this explicitly when comparing estimates."}]
  },
  {
    slug:"hidden-kitchen-remodel-costs",projectSlug:"kitchen-remodel",title:"Hidden Kitchen Remodel Costs to Budget For",description:"Plan for demolition surprises, temporary kitchen needs, utility changes, delivery charges and other commonly missed kitchen remodel expenses.",readingTime:"7 min read",
    sections:[
      {heading:"Costs that appear after work begins",paragraphs:["Demolition can reveal damaged subfloors, outdated wiring, plumbing leaks, poor ventilation or walls that are not built as expected."]},
      {heading:"Commonly forgotten budget items",paragraphs:["A complete budget should include more than visible finishes."],bullets:["Temporary cooking and food storage","Delivery, disposal and haul-away fees","Electrical-panel or circuit upgrades","Drywall, paint and flooring repairs outside the kitchen","Permit, design and engineering fees","Storage and protection for adjacent rooms"]},
      {heading:"How much contingency to hold",paragraphs:["The right contingency depends on the age of the house, how much will be opened and whether utilities or walls are moving. Keep it separate from finish upgrades so concealed-condition money remains available."]}
    ],faqs:[{question:"Are demolition costs usually included?",answer:"Sometimes, but disposal, multiple material layers and hazardous-material handling may be separate."},{question:"Should temporary housing be included?",answer:"It should be considered when the home will be difficult to occupy safely or when the kitchen will be unusable for an extended period."}]
  },
  {
    slug:"kitchen-remodel-timeline",projectSlug:"kitchen-remodel",title:"Kitchen Remodel Timeline: Planning to Completion",description:"See the main stages of a kitchen remodel and the decisions that most often delay cabinets, counters, inspections and final completion.",readingTime:"6 min read",
    sections:[
      {heading:"Typical project stages",paragraphs:["A kitchen remodel usually moves through planning, design, product selection, permitting, demolition, rough trades, inspections, cabinet installation, counters and finishes."],bullets:["Scope and budget definition","Measurements and design","Ordering long-lead materials","Demolition and rough construction","Cabinets, counters and appliances","Punch list and final inspection"]},
      {heading:"What causes delays",paragraphs:["Cabinet lead times, late product decisions, utility changes, inspection availability and concealed damage are common schedule risks."]},
      {heading:"How to protect the schedule",paragraphs:["Finalize critical selections before demolition, confirm delivery dates in writing and make sure the contractor sequence accounts for inspections and countertop templating."]}
    ],faqs:[{question:"Can cabinets be ordered after demolition?",answer:"They can, but doing so often extends the period without a working kitchen. Final measurements and product lead times should be planned early."},{question:"When are countertops measured?",answer:"They are commonly templated after base cabinets are installed and secured."}]
  },
  {
    slug:"bathroom-remodel-cost-per-square-foot",projectSlug:"bathroom-remodel",title:"Bathroom Remodel Cost per Square Foot",description:"Learn why bathroom cost per square foot varies with tile, waterproofing, fixtures, layout changes and hidden moisture damage.",readingTime:"7 min read",
    sections:[
      {heading:"Why bathrooms have high costs per square foot",paragraphs:["Bathrooms pack plumbing, electrical work, ventilation, waterproofing, cabinetry, glass and tile into a small area. Fixed trade costs therefore represent a large share of the budget."]},
      {heading:"Major rate drivers",paragraphs:["The same footprint can support a basic refresh or a complete rebuild."],bullets:["Keeping or moving fixture locations","Tile coverage and installation pattern","Shower waterproofing and custom glass","Vanity, fixtures and hardware quality","Subfloor, framing or moisture repair"]},
      {heading:"Use the rate with a detailed scope",paragraphs:["A square-foot range is useful early, but fixture count and layout usually predict cost better than floor area alone."]}
    ],faqs:[{question:"Why can a small bathroom cost so much?",answer:"Many trade visits and fixed installation tasks are required even in a small room."},{question:"Does the rate include plumbing relocation?",answer:"Only when the selected complexity and scope account for it. Moving drains and supply lines can materially increase cost."}]
  },
  {
    slug:"hidden-bathroom-remodel-costs",projectSlug:"bathroom-remodel",title:"Hidden Bathroom Remodel Costs",description:"Prepare for water damage, ventilation upgrades, subfloor repair, custom glass and other bathroom expenses that appear after demolition.",readingTime:"6 min read",
    sections:[
      {heading:"Moisture-related surprises",paragraphs:["Leaks around showers, tubs, toilets and windows can damage framing and subfloors without being visible before demolition."]},
      {heading:"Frequently missed items",paragraphs:["Several smaller items can add up quickly."],bullets:["Waterproofing-system upgrades","Exhaust fan and duct corrections","Electrical-code and GFCI work","Custom shower glass","Wall and floor leveling","Temporary bathroom arrangements"]},
      {heading:"Budget before opening the room",paragraphs:["Ask contractors how concealed damage will be priced, documented and approved before additional work begins."]}
    ],faqs:[{question:"Is mold remediation included in a remodel quote?",answer:"Usually not unless it is specifically identified and scoped. Significant contamination may require specialist work."},{question:"Can old plumbing remain in place?",answer:"Sometimes, but access during a remodel may make replacement prudent when components are deteriorated or noncompliant."}]
  },
  {
    slug:"diy-vs-contractor-bathroom-remodel",projectSlug:"bathroom-remodel",title:"DIY vs Contractor Bathroom Remodel",description:"Compare which bathroom-remodel tasks may suit DIY work and which usually require licensed, insured or specialist contractors.",readingTime:"7 min read",
    sections:[
      {heading:"Tasks homeowners sometimes handle",paragraphs:["Painting, demolition of nonhazardous finishes, accessories and simple finish work may be suitable for experienced homeowners when local rules allow."]},
      {heading:"Tasks usually best left to professionals",paragraphs:["Failures in wet areas can damage multiple rooms and create safety risks."],bullets:["Waterproofing and shower construction","Drain, vent and supply plumbing","New circuits and electrical alterations","Structural framing changes","Permit-required and inspection-dependent work"]},
      {heading:"A hybrid approach",paragraphs:["Homeowners can reduce cost by handling design decisions, product purchasing or selected finishes while professionals complete regulated and failure-sensitive work."]}
    ],faqs:[{question:"Can I waterproof a shower myself?",answer:"It is possible, but mistakes can cause expensive hidden damage. Follow the complete approved system and local requirements, or use a qualified installer."},{question:"Will DIY work affect resale?",answer:"Poor workmanship, missing permits or undocumented electrical and plumbing changes can create inspection and resale concerns."}]
  },
  {
    slug:"roof-replacement-cost-per-square-foot",projectSlug:"roof-replacement",title:"Roof Replacement Cost per Square Foot",description:"Understand roof replacement pricing by roof area, pitch, tear-off layers, shingle grade, access and decking condition.",readingTime:"7 min read",
    sections:[
      {heading:"Use roof area, not home floor area",paragraphs:["The roof surface is usually larger than the building footprint because of pitch, overhangs and attached sections."]},
      {heading:"What changes the installed rate",paragraphs:["Roof geometry and jobsite conditions affect labor as much as shingle selection."],bullets:["Pitch, height and access","Number of existing layers","Valleys, dormers, skylights and chimneys","Underlayment, flashing and ventilation scope","Decking repair and disposal requirements"]},
      {heading:"Compare complete scopes",paragraphs:["A low rate may exclude tear-off, damaged decking, flashing, permits or disposal. Compare line items rather than the headline total alone."]}
    ],faqs:[{question:"Is roof area the same as house square footage?",answer:"No. Roof area depends on footprint, pitch, overhangs and roof geometry."},{question:"Are gutters included?",answer:"Usually not unless they are explicitly listed in the roofing scope."}]
  },
  {
    slug:"roof-repair-vs-replacement",projectSlug:"roof-replacement",title:"Roof Repair vs Replacement: How to Decide",description:"Compare repair and replacement based on roof age, leak pattern, material condition, storm damage and future ownership plans.",readingTime:"7 min read",
    sections:[
      {heading:"When repair may make sense",paragraphs:["A localized problem on an otherwise serviceable roof may be suitable for repair, especially when damage is limited and matching materials are available."]},
      {heading:"When replacement becomes more practical",paragraphs:["Broad deterioration or repeated failures can make continued repairs poor value."],bullets:["Multiple active leaks","Widespread granule loss, cracking or curling","Soft or damaged decking across several areas","End-of-life materials","Extensive storm or installation defects"]},
      {heading:"Get the cause documented",paragraphs:["Ask for photographs and a written explanation of whether the issue is isolated, systemic or related to flashing, ventilation or structure."]}
    ],faqs:[{question:"Can one leak mean the whole roof needs replacement?",answer:"Not always. The location, roof age and overall condition matter more than the existence of a single leak."},{question:"Should I replace the roof before installing solar?",answer:"Often yes when the roof is near the end of its life, because removing and reinstalling solar equipment adds future cost."}]
  },
  {
    slug:"asphalt-vs-metal-roof-cost",projectSlug:"roof-replacement",title:"Asphalt Shingles vs Metal Roof Cost",description:"Compare asphalt and metal roofing on upfront cost, lifespan, maintenance, installation complexity and long-term planning.",readingTime:"7 min read",
    sections:[
      {heading:"Upfront cost",paragraphs:["Asphalt shingles usually have a lower initial installed cost. Metal systems generally require more expensive materials and specialized installation."]},
      {heading:"Long-term differences",paragraphs:["The better choice depends on climate, architecture, ownership horizon and installer availability."],bullets:["Expected service life","Repair and replacement cycle","Noise and insulation assembly","Coating and corrosion requirements","Insurance and local wind or fire considerations"]},
      {heading:"Compare system-specific quotes",paragraphs:["Metal roofing includes several systems with very different pricing and performance. Compare exact panel type, gauge, finish, fastening and underlayment."]}
    ],faqs:[{question:"Is metal roofing always cheaper over time?",answer:"Not always. Long-term value depends on installation quality, service life, maintenance, financing and how long the owner keeps the property."},{question:"Can metal roofing go over shingles?",answer:"Sometimes, subject to code, manufacturer requirements, roof condition and assembly design."}]
  },
  {
    slug:"flooring-installation-cost-per-square-foot",projectSlug:"flooring",title:"Flooring Installation Cost per Square Foot",description:"Break down flooring cost per square foot by material, removal, subfloor preparation, layout and trim work.",readingTime:"7 min read",
    sections:[
      {heading:"Material is only one part of the rate",paragraphs:["Installed cost can include removal, disposal, underlayment, adhesives, transitions, baseboards and subfloor correction."]},
      {heading:"Main pricing variables",paragraphs:["Quotes should identify both product and installation assumptions."],bullets:["Flooring material and grade","Existing-floor removal","Subfloor leveling or repair","Room shape and installation pattern","Stairs, thresholds and trim"]},
      {heading:"Measure waste separately",paragraphs:["Ordering waste depends on room layout, plank or tile size and pattern. Complex layouts generally require a larger allowance."]}
    ],faqs:[{question:"Does cost per square foot include removal?",answer:"Not always. Removal and disposal should be listed separately or clearly included."},{question:"Why is stair flooring expensive?",answer:"Stairs require detailed cutting, nosing, trim and more labor per square foot than open rooms."}]
  },
  {
    slug:"hardwood-vs-luxury-vinyl-flooring",projectSlug:"flooring",title:"Hardwood vs Luxury Vinyl Flooring Cost",description:"Compare hardwood and luxury vinyl flooring by installed cost, moisture tolerance, repairability, feel and long-term use.",readingTime:"7 min read",
    sections:[
      {heading:"Installed-cost differences",paragraphs:["Hardwood commonly has higher material and labor costs. Luxury vinyl is often faster to install but still depends on subfloor condition and product quality."]},
      {heading:"Practical tradeoffs",paragraphs:["The right material depends on the room and ownership priorities."],bullets:["Water and moisture exposure","Refinishing and repair options","Sound and underfoot feel","Sunlight and wear resistance","Resale expectations and design preference"]},
      {heading:"Do not ignore preparation",paragraphs:["Neither material performs well over a wet, uneven or unstable subfloor. Preparation can narrow or widen the price difference."]}
    ],faqs:[{question:"Can luxury vinyl be installed over existing flooring?",answer:"Sometimes, when the existing surface is stable, dry, flat and approved by the product manufacturer."},{question:"Can engineered hardwood be refinished?",answer:"Some products can be refinished, depending on the thickness of the wear layer and condition."}]
  },
  {
    slug:"hidden-flooring-installation-costs",projectSlug:"flooring",title:"Hidden Flooring Installation Costs",description:"Budget for removal, leveling, moisture control, transitions, stairs, furniture moving and other overlooked flooring expenses.",readingTime:"6 min read",
    sections:[
      {heading:"Preparation costs",paragraphs:["Subfloor preparation is one of the largest unknowns until the existing flooring is removed or inspected closely."]},
      {heading:"Common extras",paragraphs:["Ask whether each item is included in the installed rate."],bullets:["Removal and disposal","Floor leveling and patching","Moisture testing and mitigation","Baseboards and transitions","Door trimming and appliance movement","Stairs and patterned layouts"]},
      {heading:"Protect the budget",paragraphs:["Request unit prices for common extras before work starts so unexpected conditions do not become open-ended change orders."]}
    ],faqs:[{question:"Is furniture moving included?",answer:"It varies by installer and may be excluded for heavy, fragile or specialty items."},{question:"What if asbestos is found?",answer:"Work may need to stop while qualified professionals test and, when required, remediate the material."}]
  },
  {
    slug:"interior-painting-cost-per-square-foot",projectSlug:"interior-painting",title:"Interior Painting Cost per Square Foot",description:"Understand interior painting cost per square foot based on wall condition, coats, ceilings, trim, access and occupied-room protection.",readingTime:"6 min read",
    sections:[
      {heading:"Floor area is a convenient proxy",paragraphs:["Many estimates reference home floor area, but painters actually price the surfaces, preparation and access involved."]},
      {heading:"What increases painting cost",paragraphs:["Preparation and detail work often matter more than paint quantity."],bullets:["High ceilings and stairwells","Major color changes or extra coats","Drywall, plaster or stain repair","Trim, doors and cabinets","Occupied-room protection and moving"]},
      {heading:"Compare paint specifications",paragraphs:["Quotes should state product line, sheen, number of coats, surfaces included and preparation level."]}
    ],faqs:[{question:"Does the price include ceilings?",answer:"Only when ceilings are specifically included. Confirm walls, ceilings, trim and doors separately."},{question:"Is paint included in labor quotes?",answer:"Sometimes. Ask for the exact product allowance and whether primer is included."}]
  },
  {
    slug:"diy-vs-professional-interior-painting",projectSlug:"interior-painting",title:"DIY vs Professional Interior Painting",description:"Compare DIY and professional painting on preparation, equipment, finish quality, time, access and total project cost.",readingTime:"6 min read",
    sections:[
      {heading:"When DIY can work well",paragraphs:["Simple rooms with sound walls, standard ceilings and enough time can be reasonable DIY projects."]},
      {heading:"When professional work adds value",paragraphs:["Complex access and extensive preparation can make professional crews more efficient and safer."],bullets:["Tall foyers and stairwells","Damaged plaster or drywall","Detailed trim and cabinetry","Fast whole-home completion","Lead-safe requirements in older homes"]},
      {heading:"Compare total cost, not paint alone",paragraphs:["Include tools, ladders, protection materials, cleanup, time and the possibility of rework when comparing DIY with a contractor quote."]}
    ],faqs:[{question:"Can homeowners get the same finish as professionals?",answer:"Experienced homeowners can produce good results, but preparation, cutting, spray technique and production speed require practice."},{question:"Should primer always be used?",answer:"Not always, but it is commonly needed on repairs, stains, bare surfaces and major color changes."}]
  },
  {
    slug:"hidden-interior-painting-costs",projectSlug:"interior-painting",title:"Hidden Interior Painting Costs",description:"Plan for wall repair, primer, trim, furniture handling, lead-safe work and other painting costs that basic quotes may omit.",readingTime:"6 min read",
    sections:[
      {heading:"Preparation changes everything",paragraphs:["A low quote may assume clean, sound walls and limited protection. Repairs and surface problems can add substantial labor."]},
      {heading:"Common exclusions",paragraphs:["Clarify these items before choosing a painter."],bullets:["Drywall or plaster repair","Stain blocking and specialty primer","Doors, trim, closets and cabinets","Furniture moving and wall-hanging removal","Lead-safe containment","Caulking and wood repair"]},
      {heading:"Use a room-by-room scope",paragraphs:["List every surface and preparation requirement so contractors price the same work."]}
    ],faqs:[{question:"Are closets usually included?",answer:"Not necessarily. Closet interiors should be listed explicitly."},{question:"Does painting include wall repair?",answer:"Minor filling may be included, but larger drywall, plaster or water-damage repairs are often separate."}]
  },
  {
    slug:"hvac-replacement-cost-per-square-foot",projectSlug:"hvac-replacement",title:"HVAC Replacement Cost per Square Foot",description:"Understand why HVAC replacement cost per square foot varies with load, climate, efficiency, ducts, electrical work and equipment type.",readingTime:"7 min read",
    sections:[
      {heading:"Square footage does not size equipment",paragraphs:["Home size helps with early budgeting, but equipment should be selected using a professional heating and cooling load calculation."]},
      {heading:"Major cost drivers",paragraphs:["System design and existing infrastructure determine much of the installed cost."],bullets:["Equipment type and efficiency","Climate and design load","Duct condition and zoning","Electrical, drain and line-set changes","Access and equipment location"]},
      {heading:"Avoid oversizing",paragraphs:["Larger equipment is not automatically better. Oversizing can reduce comfort, humidity control and efficiency."]}
    ],faqs:[{question:"Can HVAC be sized by square footage alone?",answer:"No. Insulation, windows, orientation, climate, leakage and occupancy also affect load."},{question:"Are ducts included in replacement cost?",answer:"Basic connections may be included, but repair, redesign or full duct replacement is commonly separate."}]
  },
  {
    slug:"repair-vs-replace-hvac-system",projectSlug:"hvac-replacement",title:"Repair vs Replace an HVAC System",description:"Compare HVAC repair and replacement using system age, repair cost, efficiency, refrigerant, comfort and reliability.",readingTime:"7 min read",
    sections:[
      {heading:"When repair may be reasonable",paragraphs:["A well-maintained system with a limited, affordable failure may be worth repairing when performance and comfort remain acceptable."]},
      {heading:"Reasons to consider replacement",paragraphs:["Replacement becomes more attractive when several problems occur together."],bullets:["Repeated breakdowns","Major compressor or heat-exchanger failure","Poor comfort or humidity control","Obsolete or costly refrigerant","High operating cost and low efficiency"]},
      {heading:"Request both options",paragraphs:["Ask the contractor for the repair scope, expected remaining life, replacement alternatives and any required duct or electrical work."]}
    ],faqs:[{question:"Does one expensive repair mean replacement is better?",answer:"Not automatically. Compare system condition, age, warranty, expected life and the full installed replacement cost."},{question:"Should indoor and outdoor units be replaced together?",answer:"Matched equipment is commonly recommended for performance, efficiency and warranty compliance."}]
  },
  {
    slug:"hidden-hvac-replacement-costs",projectSlug:"hvac-replacement",title:"Hidden HVAC Replacement Costs",description:"Budget for duct repair, electrical upgrades, permits, condensate work, equipment access and other HVAC replacement extras.",readingTime:"6 min read",
    sections:[
      {heading:"The equipment quote may not be the whole project",paragraphs:["A replacement can uncover issues with ducts, electrical capacity, drains, line sets, ventilation or equipment access."]},
      {heading:"Common additional costs",paragraphs:["Ask installers to inspect and price these items before signing."],bullets:["Duct sealing, repair or replacement","Electrical disconnect or panel work","Condensate drain and pump changes","Refrigerant line replacement","Crane, attic or crawlspace access","Permits, testing and disposal"]},
      {heading:"Compare commissioning and warranty",paragraphs:["A complete scope should include startup testing, airflow checks, controls, registration and clear labor-warranty terms."]}
    ],faqs:[{question:"Is thermostat replacement included?",answer:"Sometimes. Confirm the thermostat model, compatibility and installation."},{question:"Can existing refrigerant lines be reused?",answer:"Sometimes, depending on size, condition, cleanliness, refrigerant and manufacturer requirements."}]
  }
];

export const topicGuideMap=new Map(topicGuides.map((guide)=>[guide.slug,guide]));
export const topicGuidePublishedAt=published;
