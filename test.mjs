import assert from "node:assert/strict";
import { calculateRoofingEstimate } from "./calculator.js";

const architectural = calculateRoofingEstimate({
  areaUnit: "sqft",
  area: 2000,
  shingleType: "architectural",
  layers: 1,
  includeUnderlayment: true,
  wastePercent: 5,
  extraDebrisLb: 0,
  quoteDumpsterYards: 20,
  includedTons: 3,
  rentalPrice: 450,
  overagePerTon: 100
});

assert.equal(architectural.roofSquares, 20);
assert.ok(architectural.expectedTons > 4);
assert.ok(architectural.quote.expectedExcessTons > 1);
assert.ok(architectural.recommendation.yards >= 30 || architectural.recommendation.yards === null);

const threeTab = calculateRoofingEstimate({
  areaUnit: "squares",
  area: 10,
  shingleType: "threeTab",
  layers: 1,
  includeUnderlayment: false,
  wastePercent: 0,
  extraDebrisLb: 0,
  quoteDumpsterYards: 10,
  includedTons: 2,
  rentalPrice: 0,
  overagePerTon: 0
});
assert.equal(threeTab.expectedWeightLb, 2400);
assert.equal(threeTab.expectedTons, 1.2);

console.log("All calculator tests passed.");
