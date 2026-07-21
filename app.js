import { DUMPSTERS, calculateRoofingEstimate } from "./calculator.js";

const form = document.querySelector("#estimator-form");
const results = document.querySelector("#results");
const areaLabel = document.querySelector("#area-label");
const areaHelp = document.querySelector("#area-help");
const areaInput = document.querySelector("#area");
const areaUnit = document.querySelector("#area-unit");
const quoteDumpster = document.querySelector("#quote-dumpster");
const includedTons = document.querySelector("#included-tons");

const formatNumber = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const formatInteger = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function syncAreaField() {
  const squares = areaUnit.value === "squares";
  areaLabel.textContent = squares ? "Roof size (squares)" : "Roof area (square feet)";
  areaHelp.textContent = squares
    ? "One roofing square covers 100 square feet."
    : "Use the actual sloped roof surface area when available, not only the home footprint.";
  areaInput.step = squares ? "0.1" : "1";
  areaInput.min = squares ? "1" : "100";
  if (squares && Number(areaInput.value) > 200) areaInput.value = "20";
  if (!squares && Number(areaInput.value) < 100) areaInput.value = "2000";
}

function syncIncludedWeight() {
  const selected = DUMPSTERS.find((d) => d.yards === Number(quoteDumpster.value));
  if (selected) includedTons.value = selected.defaultIncludedTons;
}

function getInput() {
  const data = new FormData(form);
  return {
    areaUnit: data.get("areaUnit"),
    area: Number(data.get("area")),
    shingleType: data.get("shingleType"),
    layers: Number(data.get("layers")),
    includeUnderlayment: data.get("includeUnderlayment") === "on",
    wastePercent: Number(data.get("wastePercent")),
    extraDebrisLb: Number(data.get("extraDebrisLb")),
    quoteDumpsterYards: Number(data.get("quoteDumpsterYards")),
    includedTons: Number(data.get("includedTons")),
    rentalPrice: Number(data.get("rentalPrice")),
    overagePerTon: Number(data.get("overagePerTon"))
  };
}

function capacityBar(label, value, suffix) {
  const width = Math.min(value, 100);
  const state = value > 100 ? "danger" : value > 85 ? "warning" : "safe";
  return `
    <div class="capacity-row">
      <div class="capacity-label"><span>${label}</span><strong>${formatInteger.format(value)}${suffix}</strong></div>
      <div class="meter" aria-label="${label}: ${formatInteger.format(value)}${suffix}">
        <span class="meter-fill ${state}" style="width:${width}%"></span>
      </div>
    </div>`;
}

function recommendationText(estimate) {
  const rec = estimate.recommendation;
  if (!rec.yards) {
    return `<strong>${rec.label}</strong><span>The estimated ${rec.reason} exceeds the general ranges used by standard 10–40 yard containers. Ask the rental provider about roofing-only loads, multiple hauls, and road-weight limits.</span>`;
  }

  const reason = rec.reason === "weight"
    ? "Weight drives this recommendation."
    : rec.reason === "volume"
      ? "Volume drives this recommendation."
      : "Both volume and weight support this recommendation.";
  return `<strong>${rec.label}</strong><span>${reason} Confirm the actual included tonnage with the rental company.</span>`;
}

function render() {
  if (!form.reportValidity()) return;

  const estimate = calculateRoofingEstimate(getInput());
  const q = estimate.quote;
  const overweight = q.highExcessTons > 0;

  results.innerHTML = `
    <div class="results-heading">
      <div>
        <span class="eyebrow">Planning estimate</span>
        <h2>${estimate.roofSquares} roofing squares</h2>
        <p>${formatInteger.format(estimate.roofAreaSqFt)} sq ft · ${estimate.shingleLabel}</p>
      </div>
      <span class="status ${overweight ? "status-warning" : "status-safe"}">${overweight ? "Overweight risk" : "Within selected allowance"}</span>
    </div>

    <div class="result-grid">
      <section class="result-card featured">
        <span class="result-label">Recommended starting size</span>
        ${recommendationText(estimate)}
      </section>

      <section class="result-card">
        <span class="result-label">Estimated debris weight</span>
        <strong>${formatNumber.format(estimate.expectedTons)} US tons</strong>
        <span>${formatNumber.format(estimate.lowTons)}–${formatNumber.format(estimate.highTons)} ton planning range</span>
        <small>${formatInteger.format(estimate.expectedWeightLb)} lb expected</small>
      </section>

      <section class="result-card">
        <span class="result-label">Estimated loose volume</span>
        <strong>${formatNumber.format(estimate.expectedVolumeYd3)} yd³</strong>
        <span>${formatNumber.format(estimate.lowVolumeYd3)}–${formatNumber.format(estimate.highVolumeYd3)} yd³ planning range</span>
        <small>Packing and breakage can change actual volume.</small>
      </section>
    </div>

    <section class="quote-analysis">
      <div class="section-title-row">
        <div>
          <span class="eyebrow">Your selected quote</span>
          <h3>${q.dumpsterYards}-yard dumpster · ${formatNumber.format(q.includedTons)} tons included</h3>
        </div>
        ${overweight ? '<span class="warning-pill">Check overage terms</span>' : ''}
      </div>

      ${capacityBar("Expected volume", q.volumeUsagePct, "%")}
      ${capacityBar("Expected weight", q.weightUsagePct, "%")}

      <div class="cost-grid">
        <div><span>Expected excess weight</span><strong>${formatNumber.format(q.expectedExcessTons)} tons</strong></div>
        <div><span>High-case excess weight</span><strong>${formatNumber.format(q.highExcessTons)} tons</strong></div>
        <div><span>Expected overage</span><strong>${formatMoney.format(q.expectedOverage)}</strong></div>
        <div><span>Estimated total</span><strong>${formatMoney.format(q.expectedTotal)}</strong></div>
      </div>
    </section>

    <div class="result-note">
      <strong>Before ordering:</strong> Tell the rental company the roof area, shingle type, number of layers, and whether felt, flashing, wood, or other debris will be mixed in. Local weight limits and accepted materials override this estimate.
    </div>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  render();
  results.scrollIntoView({ behavior: "smooth", block: "start" });
});

areaUnit.addEventListener("change", () => {
  syncAreaField();
  render();
});
quoteDumpster.addEventListener("change", () => {
  syncIncludedWeight();
  render();
});
form.addEventListener("input", (event) => {
  if (event.target.matches("input, select")) render();
});

syncAreaField();
syncIncludedWeight();
render();
