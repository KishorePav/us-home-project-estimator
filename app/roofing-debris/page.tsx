"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { calculateRoofingEstimate, DUMPSTERS } from "../calculator";

const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const initial = { areaUnit: "sqft", area: 2000, shingleType: "architectural", layers: 1, includeUnderlayment: true, wastePercent: 5, extraDebrisLb: 0, quoteDumpsterYards: 20, includedTons: 3, rentalPrice: 450, overagePerTon: 100 };

function Header() {
  return <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">PY</span><span>Project Yard</span></Link><nav aria-label="Main navigation"><a href="#calculator">Calculator</a><Link href="/methodology">Methodology</Link></nav></header>;
}
function Meter({ label, value }: { label: string; value: number }) {
  const state = value > 100 ? "danger" : value > 85 ? "warning" : "safe";
  return <div className="capacity-row"><div className="capacity-label"><span>{label}</span><strong>{integer.format(value)}%</strong></div><div className="meter" aria-label={`${label}: ${integer.format(value)}%`}><span className={`meter-fill ${state}`} style={{ width: `${Math.min(value, 100)}%` }} /></div></div>;
}

export default function Home() {
  const [form, setForm] = useState(initial);
  const result = useMemo(() => calculateRoofingEstimate(form), [form]);
  const q = result.quote;
  const overweight = q.highExcessTons > 0;
  const update = (name: string, value: string | number | boolean) => setForm((old) => ({ ...old, [name]: value }));
  const submit = (event: FormEvent) => { event.preventDefault(); document.querySelector("#results")?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const recommendationReason = result.recommendation.reason === "weight" ? "Weight drives this recommendation." : result.recommendation.reason === "volume" ? "Volume drives this recommendation." : "Both volume and weight support this recommendation.";

  return <>
    <Header />
    <main>
      <section className="hero"><div className="hero-copy"><span className="eyebrow">US roofing tear-off planner</span><h1>Estimate roofing debris before you rent a dumpster.</h1><p>Calculate asphalt-shingle weight, loose debris volume, a practical dumpster starting size, and possible overweight charges.</p><div className="trust-row"><span>No signup</span><span>Runs in your browser</span><span>US customary units</span></div></div><div className="hero-stat"><span>Why this matters</span><strong>Weight can fill your allowance before debris fills the container.</strong></div></section>

      <section className="calculator-shell" id="calculator">
        <form className="calculator-form" onSubmit={submit}>
          <div className="form-intro"><span className="eyebrow">Project details</span><h2>Roofing debris calculator</h2><p>Use the roof surface area from a measurement report or contractor estimate when possible.</p></div>
          <div className="field-row split"><label className="field"><span>{form.areaUnit === "squares" ? "Roof size (squares)" : "Roof area (square feet)"}</span><input name="area" type="number" value={form.area} min={form.areaUnit === "squares" ? 1 : 100} step={form.areaUnit === "squares" ? .1 : 1} required onChange={(e) => update("area", Number(e.target.value))}/><small>{form.areaUnit === "squares" ? "One roofing square covers 100 square feet." : "Use the actual sloped roof surface area when available, not only the home footprint."}</small></label><label className="field compact"><span>Area unit</span><select value={form.areaUnit} onChange={(e) => update("areaUnit", e.target.value)}><option value="sqft">Square feet</option><option value="squares">Roofing squares</option></select></label></div>
          <div className="field-row split"><label className="field"><span>Shingle type</span><select value={form.shingleType} onChange={(e) => update("shingleType", e.target.value)}><option value="threeTab">3-tab asphalt shingles</option><option value="architectural">Architectural asphalt shingles</option></select></label><label className="field"><span>Layers being removed</span><select value={form.layers} onChange={(e) => update("layers", Number(e.target.value))}>{[1,2,3,4].map(v => <option key={v} value={v}>{v} layer{v > 1 ? "s" : ""}</option>)}</select></label></div>
          <div className="field-row split"><label className="field"><span>Planning allowance</span><div className="input-suffix"><input type="number" value={form.wastePercent} min="0" max="50" onChange={(e) => update("wastePercent", Number(e.target.value))}/><span>%</span></div><small>Adds room for nails, flashing, dirt, moisture, and measurement uncertainty.</small></label><label className="field"><span>Other debris</span><div className="input-suffix"><input type="number" value={form.extraDebrisLb} min="0" step="50" onChange={(e) => update("extraDebrisLb", Number(e.target.value))}/><span>lb</span></div><small>Optional weight for flashing, vents, small wood repairs, or similar material.</small></label></div>
          <label className="check-field"><input type="checkbox" checked={form.includeUnderlayment} onChange={(e) => update("includeUnderlayment", e.target.checked)}/><span><strong>Include roofing felt/underlayment</strong><small>Uses 15 lb per roofing square as a planning assumption.</small></span></label>
          <div className="form-divider" />
          <div className="form-intro small"><span className="eyebrow">Optional quote check</span><h3>Compare a dumpster quote</h3><p>Enter the included tonnage from your rental quote. Allowances vary by provider and location.</p></div>
          <div className="field-row split three"><label className="field"><span>Dumpster size</span><select value={form.quoteDumpsterYards} onChange={(e) => { const yards=Number(e.target.value); const d=DUMPSTERS.find(x=>x.yards===yards); setForm(old=>({...old,quoteDumpsterYards:yards,includedTons:d?.defaultIncludedTons ?? old.includedTons})); }}>{DUMPSTERS.map(d=><option key={d.yards} value={d.yards}>{d.yards} yards</option>)}</select></label><label className="field"><span>Included weight</span><div className="input-suffix"><input type="number" value={form.includedTons} min=".25" step=".25" onChange={(e)=>update("includedTons",Number(e.target.value))}/><span>tons</span></div></label><label className="field"><span>Overage rate</span><div className="input-prefix"><span>$</span><input type="number" value={form.overagePerTon} min="0" step="5" onChange={(e)=>update("overagePerTon",Number(e.target.value))}/><span>/ton</span></div></label></div>
          <label className="field rental"><span>Base rental price</span><div className="input-prefix"><span>$</span><input type="number" value={form.rentalPrice} min="0" step="10" onChange={(e)=>update("rentalPrice",Number(e.target.value))}/></div></label>
          <button type="submit">Calculate debris and dumpster size</button>
        </form>
        <aside id="results" className="results-panel" aria-live="polite">
          <div className="results-heading"><div><span className="eyebrow">Planning estimate</span><h2>{result.roofSquares} roofing squares</h2><p>{integer.format(result.roofAreaSqFt)} sq ft · {result.shingleLabel}</p></div><span className={`status ${overweight ? "status-warning" : "status-safe"}`}>{overweight ? "Overweight risk" : "Within selected allowance"}</span></div>
          <div className="result-grid"><section className="result-card featured"><span className="result-label">Recommended starting size</span><strong>{result.recommendation.label}</strong><span>{result.recommendation.yards ? `${recommendationReason} Confirm actual included tonnage.` : "Ask the rental provider about roofing-only loads, multiple hauls, and road-weight limits."}</span></section><section className="result-card"><span className="result-label">Estimated debris weight</span><strong>{number.format(result.expectedTons)} US tons</strong><span>{number.format(result.lowTons)}–{number.format(result.highTons)} ton planning range</span><small>{integer.format(result.expectedWeightLb)} lb expected</small></section><section className="result-card"><span className="result-label">Estimated loose volume</span><strong>{number.format(result.expectedVolumeYd3)} yd³</strong><span>{number.format(result.lowVolumeYd3)}–{number.format(result.highVolumeYd3)} yd³ planning range</span><small>Packing and breakage can change actual volume.</small></section></div>
          <section className="quote-analysis"><div className="section-title-row"><div><span className="eyebrow">Your selected quote</span><h3>{q.dumpsterYards}-yard dumpster · {number.format(q.includedTons)} tons included</h3></div>{overweight && <span className="warning-pill">Check overage terms</span>}</div><Meter label="Expected volume" value={q.volumeUsagePct}/><Meter label="Expected weight" value={q.weightUsagePct}/><div className="cost-grid"><div><span>Expected excess weight</span><strong>{number.format(q.expectedExcessTons)} tons</strong></div><div><span>High-case excess weight</span><strong>{number.format(q.highExcessTons)} tons</strong></div><div><span>Expected overage</span><strong>{money.format(q.expectedOverage)}</strong></div><div><span>Estimated total</span><strong>{money.format(q.expectedTotal)}</strong></div></div></section>
          <div className="result-note"><strong>Before ordering:</strong> Tell the rental company the roof area, shingle type, number of layers, and whether felt, flashing, wood, or other debris will be mixed in.</div>
        </aside>
      </section>
      <section className="content-section"><div><span className="eyebrow">How to use the result</span><h2>Call the rental company with the weight estimate—not only the dumpster size.</h2></div><div className="content-columns"><p>A container can have enough physical space but an insufficient included-weight allowance. Tell the provider that the load contains roofing shingles and confirm which mixed materials are accepted.</p><p>This calculator provides a planning range, not a guaranteed scale-ticket weight. Product thickness, moisture, extra layers, attached material, and packing change the final load.</p></div></section>
    </main>
    <footer><span>Project Yard</span><div><Link href="/methodology">Methodology</Link><Link href="/privacy">Privacy</Link></div><small>Planning estimates only. Confirm limits and accepted materials with the rental provider.</small></footer>
  </>;
}
