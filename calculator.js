export const SHINGLE_TYPES = {
  threeTab: {
    label: "3-tab asphalt shingles",
    poundsPerSquare: 240,
    sourceNote: "GAF: about 2,400 lb per 1,000 sq ft"
  },
  architectural: {
    label: "Architectural asphalt shingles",
    poundsPerSquare: 420,
    sourceNote: "GAF: about 4,200 lb per 1,000 sq ft"
  }
};

export const DUMPSTERS = [
  { yards: 10, typicalMinLb: 2000, typicalMaxLb: 4000, defaultIncludedTons: 2 },
  { yards: 15, typicalMinLb: 2000, typicalMaxLb: 4000, defaultIncludedTons: 2 },
  { yards: 20, typicalMinLb: 4000, typicalMaxLb: 6000, defaultIncludedTons: 3 },
  { yards: 30, typicalMinLb: 6000, typicalMaxLb: 8000, defaultIncludedTons: 4 },
  { yards: 40, typicalMinLb: 8000, typicalMaxLb: 10000, defaultIncludedTons: 5 }
];

const UNDERLAYMENT_LB_PER_SQUARE = 15;
const DENSITY_TONS_PER_CUBIC_YARD = {
  low: 0.21,
  expected: 0.29,
  high: 0.37
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const round = (value, digits = 1) => Number(value.toFixed(digits));

export function calculateRoofingEstimate(input) {
  const roofSquares = input.areaUnit === "squares"
    ? input.area
    : input.area / 100;

  const shingle = SHINGLE_TYPES[input.shingleType];
  if (!shingle) throw new Error("Unsupported shingle type");

  const layers = clamp(Number(input.layers || 1), 1, 5);
  const wastePercent = clamp(Number(input.wastePercent || 0), 0, 50);
  const extraDebrisLb = Math.max(Number(input.extraDebrisLb || 0), 0);

  const shingleWeightLb = roofSquares * shingle.poundsPerSquare * layers;
  const underlaymentWeightLb = input.includeUnderlayment
    ? roofSquares * UNDERLAYMENT_LB_PER_SQUARE
    : 0;

  const baseWeightLb = shingleWeightLb + underlaymentWeightLb + extraDebrisLb;
  const expectedWeightLb = baseWeightLb * (1 + wastePercent / 100);

  // Field conditions vary: moisture, nails, flashing, felt, dirt, and product thickness.
  const lowWeightLb = expectedWeightLb * 0.9;
  const highWeightLb = expectedWeightLb * 1.12;

  const expectedTons = expectedWeightLb / 2000;
  const lowTons = lowWeightLb / 2000;
  const highTons = highWeightLb / 2000;

  // Lower material density produces a higher volume estimate.
  const lowVolumeYd3 = lowTons / DENSITY_TONS_PER_CUBIC_YARD.high;
  const expectedVolumeYd3 = expectedTons / DENSITY_TONS_PER_CUBIC_YARD.expected;
  const highVolumeYd3 = highTons / DENSITY_TONS_PER_CUBIC_YARD.low;

  const volumeDumpster = DUMPSTERS.find((d) => d.yards >= highVolumeYd3);
  const weightDumpster = DUMPSTERS.find((d) => d.typicalMaxLb >= highWeightLb);

  let recommendation;
  if (!volumeDumpster || !weightDumpster) {
    recommendation = {
      yards: null,
      label: "Multiple hauls or a custom heavy-material container",
      reason: !weightDumpster ? "weight" : "volume"
    };
  } else {
    const volumeIndex = DUMPSTERS.indexOf(volumeDumpster);
    const weightIndex = DUMPSTERS.indexOf(weightDumpster);
    const selected = DUMPSTERS[Math.max(volumeIndex, weightIndex)];
    recommendation = {
      ...selected,
      label: `${selected.yards}-yard dumpster`,
      reason: weightIndex > volumeIndex ? "weight" : volumeIndex > weightIndex ? "volume" : "both"
    };
  }

  const quoteDumpster = DUMPSTERS.find((d) => d.yards === Number(input.quoteDumpsterYards)) || DUMPSTERS[2];
  const includedTons = Math.max(Number(input.includedTons ?? quoteDumpster.defaultIncludedTons), 0);
  const overagePerTon = Math.max(Number(input.overagePerTon || 0), 0);
  const rentalPrice = Math.max(Number(input.rentalPrice || 0), 0);
  const expectedExcessTons = Math.max(0, expectedTons - includedTons);
  const highExcessTons = Math.max(0, highTons - includedTons);
  const expectedOverage = expectedExcessTons * overagePerTon;
  const highOverage = highExcessTons * overagePerTon;

  const volumeUsagePct = quoteDumpster.yards > 0
    ? (expectedVolumeYd3 / quoteDumpster.yards) * 100
    : 0;
  const weightUsagePct = includedTons > 0
    ? (expectedTons / includedTons) * 100
    : 0;

  return {
    roofSquares: round(roofSquares, 2),
    roofAreaSqFt: round(roofSquares * 100, 0),
    shingleLabel: shingle.label,
    lowWeightLb: round(lowWeightLb, 0),
    expectedWeightLb: round(expectedWeightLb, 0),
    highWeightLb: round(highWeightLb, 0),
    lowTons: round(lowTons, 2),
    expectedTons: round(expectedTons, 2),
    highTons: round(highTons, 2),
    lowVolumeYd3: round(lowVolumeYd3, 1),
    expectedVolumeYd3: round(expectedVolumeYd3, 1),
    highVolumeYd3: round(highVolumeYd3, 1),
    recommendation,
    quote: {
      dumpsterYards: quoteDumpster.yards,
      includedTons: round(includedTons, 2),
      rentalPrice: round(rentalPrice, 2),
      overagePerTon: round(overagePerTon, 2),
      expectedExcessTons: round(expectedExcessTons, 2),
      highExcessTons: round(highExcessTons, 2),
      expectedOverage: round(expectedOverage, 2),
      highOverage: round(highOverage, 2),
      expectedTotal: round(rentalPrice + expectedOverage, 2),
      highTotal: round(rentalPrice + highOverage, 2),
      volumeUsagePct: round(volumeUsagePct, 0),
      weightUsagePct: round(weightUsagePct, 0)
    }
  };
}
