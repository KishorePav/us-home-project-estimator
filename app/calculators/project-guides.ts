export type ProjectGuide = {
  summary: string;
  included: string[];
  drivers: string[];
  watchFor: string[];
  related: string[];
};

export const projectGuides: Record<string, ProjectGuide> = {
  "kitchen-remodel": {
    summary: "Build a practical kitchen-remodel budget before comparing cabinet, countertop, appliance, and installation quotes.",
    included: ["Cabinetry and hardware allowances", "Countertops, appliances, and finish materials", "Typical installation labor", "Permit allowance and planning contingency"],
    drivers: ["Cabinet layout and construction quality", "Appliance package and utility changes", "Countertop material and fabrication", "Structural, electrical, and plumbing scope"],
    watchFor: ["Temporary kitchen and storage costs", "Hidden wall, floor, or moisture damage", "Long-lead cabinets and custom fabrication"],
    related: ["flooring", "interior-painting", "electrical-work"],
  },
  "bathroom-remodel": {
    summary: "Estimate a bathroom refresh or full renovation while accounting for fixtures, waterproofing, tile, labor, and permits.",
    included: ["Standard fixture and finish allowances", "Tile, waterproofing, and installation labor", "Typical plumbing and electrical work", "Permit allowance and planning contingency"],
    drivers: ["Keeping or relocating the existing layout", "Tile area and material selection", "Fixture and vanity quality", "Waterproofing and concealed damage"],
    watchFor: ["Rot, mold, or subfloor repair", "Ventilation and electrical-code upgrades", "Custom glass and specialty fixtures"],
    related: ["plumbing", "flooring", "interior-painting"],
  },
  "roof-replacement": {
    summary: "Plan an asphalt-shingle roof replacement using roof area, local pricing, finish level, complexity, and contingency.",
    included: ["Typical tear-off and disposal", "Asphalt shingles and underlayment", "Standard flashing and installation labor", "Permit allowance and planning contingency"],
    drivers: ["Actual sloped roof area and pitch", "Number of layers to remove", "Valleys, dormers, skylights, and access", "Shingle grade and ventilation work"],
    watchFor: ["Decking or structural repairs", "Specialty roofing materials", "Gutter, fascia, and chimney work"],
    related: ["window-replacement", "solar-savings", "whole-home-renovation"],
  },
  flooring: {
    summary: "Compare installed flooring budgets by area, market, finish level, complexity, and a realistic waste contingency.",
    included: ["Flooring material allowance", "Typical underlayment and installation", "Standard transition and trim work", "Planning contingency for waste"],
    drivers: ["Material type and product grade", "Subfloor condition and leveling", "Room layout and pattern complexity", "Removal, disposal, and furniture moving"],
    watchFor: ["Moisture mitigation", "Stair treads and custom transitions", "Asbestos or other hazardous-material handling"],
    related: ["interior-painting", "kitchen-remodel", "bathroom-remodel"],
  },
  "interior-painting": {
    summary: "Estimate interior painting with labor, paint, surface preparation, finish level, and project complexity included.",
    included: ["Walls and standard ceilings", "Typical paint and sundries", "Basic preparation and application labor", "Planning contingency"],
    drivers: ["Number of coats and color changes", "Ceiling height and access", "Surface preparation and repairs", "Trim, doors, cabinets, and specialty finishes"],
    watchFor: ["Major drywall or plaster repair", "Lead-safe work in older homes", "Occupied-room protection and furniture handling"],
    related: ["flooring", "whole-home-renovation", "kitchen-remodel"],
  },
  "hvac-replacement": {
    summary: "Set an early central HVAC replacement budget before obtaining equipment sizing, efficiency, and installation proposals.",
    included: ["Typical central heating and cooling equipment", "Standard replacement installation labor", "Basic controls and commissioning", "Permit allowance and planning contingency"],
    drivers: ["Home size, climate, and load requirements", "Efficiency rating and equipment type", "Duct condition and accessibility", "Electrical, drain, and ventilation changes"],
    watchFor: ["Whole-duct replacement", "Electrical service upgrades", "Asbestos or difficult equipment removal"],
    related: ["electrical-work", "solar-savings", "whole-home-renovation"],
  },
  "electrical-work": {
    summary: "Budget common residential electrical tasks by the number of outlets, fixtures, circuits, or comparable project points.",
    included: ["Typical devices and basic materials", "Standard residential electrician labor", "Minor circuit or fixture work", "Permit allowance and planning contingency"],
    drivers: ["New circuits versus like-for-like replacement", "Wall access and wire-routing difficulty", "Device, fixture, and control quality", "Panel capacity and code requirements"],
    watchFor: ["Panel or service replacement", "Extensive drywall opening and repair", "Whole-home rewiring or remediation"],
    related: ["hvac-replacement", "kitchen-remodel", "solar-savings"],
  },
  plumbing: {
    summary: "Plan common residential plumbing work by fixture or task count before requesting scope-matched contractor quotes.",
    included: ["Typical fixture or task materials", "Standard plumber labor", "Minor connection and replacement work", "Permit allowance and planning contingency"],
    drivers: ["Fixture type and product quality", "Access behind walls or below floors", "Pipe material and condition", "Drain, vent, and shutoff changes"],
    watchFor: ["Wall and floor restoration", "Sewer, septic, or main-line work", "Whole-home repiping"],
    related: ["bathroom-remodel", "kitchen-remodel", "whole-home-renovation"],
  },
  "fence-installation": {
    summary: "Estimate an installed residential fence by linear footage, material quality, site complexity, gates, and contingency.",
    included: ["Typical fence panels or pickets", "Posts, rails, concrete, and hardware", "Standard installation labor", "Permit allowance and planning contingency"],
    drivers: ["Fence material and height", "Gate count and hardware", "Terrain, soil, and access", "Removal of an existing fence"],
    watchFor: ["Surveying and property-line disputes", "Retaining walls or grade changes", "HOA and local design restrictions"],
    related: ["deck-construction", "concrete-patio", "whole-home-renovation"],
  },
  "deck-construction": {
    summary: "Plan a professionally installed deck using area, finish level, elevation, site complexity, and a construction contingency.",
    included: ["Typical framing and decking materials", "Standard footings and installation labor", "Basic rails where applicable", "Permit allowance and planning contingency"],
    drivers: ["Deck height, stairs, and railings", "Wood versus composite decking", "Footing and soil conditions", "Access, shape, and structural complexity"],
    watchFor: ["Engineering requirements", "Ledger or house-attachment repairs", "Lighting, roofs, kitchens, and custom features"],
    related: ["concrete-patio", "fence-installation", "whole-home-renovation"],
  },
  "solar-savings": {
    summary: "Estimate the gross cost of a residential solar system before incentives, financing, utility rules, and site-specific production modeling.",
    included: ["Typical panels, inverter, and mounting hardware", "Standard residential installation labor", "Basic permitting and interconnection allowance", "Planning contingency"],
    drivers: ["System capacity and equipment selection", "Roof layout, pitch, shade, and access", "Electrical-panel and service condition", "Local labor and interconnection requirements"],
    watchFor: ["Roof replacement before installation", "Battery storage and backup hardware", "Financing charges and changing incentives"],
    related: ["roof-replacement", "electrical-work", "hvac-replacement"],
  },
  "whole-home-renovation": {
    summary: "Create an early whole-home renovation range for coordinated multi-room work before design and contractor pricing begins.",
    included: ["Typical interior finish and fixture allowances", "Coordinated trade labor", "Basic permit allowance", "Planning contingency across multiple rooms"],
    drivers: ["Renovation depth and number of rooms", "Kitchen, bathroom, and system upgrades", "Finish quality and custom work", "Structural and layout changes"],
    watchFor: ["Temporary housing and storage", "Major foundation or structural repairs", "Scope growth after demolition"],
    related: ["kitchen-remodel", "bathroom-remodel", "interior-painting"],
  },
  "window-replacement": {
    summary: "Estimate installed replacement windows by count, market, product quality, opening complexity, and contingency.",
    included: ["Typical replacement-window units", "Standard removal and installation labor", "Basic flashing, sealing, and trim touch-up", "Permit allowance and planning contingency"],
    drivers: ["Window material and performance package", "Opening size and custom shapes", "Access and story height", "Rot, trim, and exterior finish repairs"],
    watchFor: ["Historic-district requirements", "New-construction opening changes", "Lead-safe work in older homes"],
    related: ["interior-painting", "roof-replacement", "whole-home-renovation"],
  },
  "concrete-patio": {
    summary: "Plan a concrete slab or patio by square footage, finish level, site complexity, access, and contingency.",
    included: ["Typical base preparation and concrete", "Standard forming and placement labor", "Basic broom or comparable finish", "Permit allowance and planning contingency"],
    drivers: ["Thickness, reinforcement, and concrete specification", "Excavation and base preparation", "Access for trucks or pumping", "Decorative finish and edge complexity"],
    watchFor: ["Demolition and haul-away", "Drainage and grading corrections", "Engineered foundations or structural slabs"],
    related: ["deck-construction", "fence-installation", "whole-home-renovation"],
  },
};
