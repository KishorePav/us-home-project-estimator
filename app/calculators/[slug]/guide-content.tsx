import Link from "next/link";
import type {Project} from "../../project-data";
import {estimate} from "../../project-data";
import type {ProjectGuide} from "../project-guides";
import styles from "./guide-content.module.css";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const rateMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function CalculatorGuide({
  project,
  guide,
  relatedProjects,
}: {
  project: Project;
  guide: ProjectGuide;
  relatedProjects: Project[];
}) {
  const example = estimate(
    project,
    project.defaultSize,
    "US average",
    "Standard",
    "Typical",
    10,
  );

  return (
    <section className={styles.guide} aria-label={`${project.title} planning guide`}>
      <div className={styles.intro}>
        <span className="eyebrow">Planning guide</span>
        <h2>Understand the range before you request quotes.</h2>
        <p>{guide.summary}</p>
      </div>

      <div className={styles.snapshot}>
        <div>
          <span>Example project</span>
          <strong>
            {project.defaultSize.toLocaleString("en-US")} {project.unit}
          </strong>
          <small>Default calculator starting point</small>
        </div>
        <div>
          <span>Base unit range</span>
          <strong>
            {rateMoney.format(project.lowRate)}–{rateMoney.format(project.highRate)}
          </strong>
          <small>Before market, finish, complexity, and contingency</small>
        </div>
        <div>
          <span>Example planning range</span>
          <strong>
            {money.format(example.low)}–{money.format(example.high)}
          </strong>
          <small>US average, standard finish, typical complexity, 10% contingency</small>
        </div>
      </div>

      <section>
        <div className={styles.sectionHeading}>
          <span className="eyebrow">How to use the calculator</span>
          <h2>Turn a rough idea into a quote-ready starting point.</h2>
          <p>
            This is a planning tool, not a contractor bid. Use the range to define scope,
            compare like-for-like proposals, and identify the questions that could materially
            change the final price.
          </p>
        </div>
        <div className={styles.steps}>
          <article className={styles.step}>
            <span>1</span>
            <h3>Enter a realistic size</h3>
            <p>Use the measurement or task count that most closely matches the work contractors will price.</p>
          </article>
          <article className={styles.step}>
            <span>2</span>
            <h3>Adjust the project conditions</h3>
            <p>Choose the local cost level, finish, complexity, and contingency that reflect your actual plan.</p>
          </article>
          <article className={styles.step}>
            <span>3</span>
            <h3>Compare complete scopes</h3>
            <p>Enter contractor quotes and check whether each proposal includes the same materials, labor, permits, and cleanup.</p>
          </article>
        </div>
      </section>

      <div className={styles.detailGrid}>
        <section className={styles.detailCard}>
          <span className="eyebrow">Typical coverage</span>
          <h2>What the planning range includes</h2>
          <ul>{guide.included.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className={styles.detailCard}>
          <span className="eyebrow">Cost drivers</span>
          <h2>What can move the price</h2>
          <ul>{guide.drivers.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>

      <section className={styles.watch}>
        <span className="eyebrow">Before signing a quote</span>
        <h2>Items that often sit outside the first estimate</h2>
        <ul>{guide.watchFor.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section>
        <div className={styles.sectionHeading}>
          <span className="eyebrow">Common questions</span>
          <h2>{project.title} cost calculator FAQ</h2>
        </div>
        <div className={styles.faqGrid}>
          <article className={styles.faq}>
            <h3>How accurate is this estimate?</h3>
            <p>
              It is an early planning range based on project size and broad US cost factors.
              Actual quotes depend on local labor, exact specifications, access, existing conditions,
              permits, and contractor availability.
            </p>
          </article>
          <article className={styles.faq}>
            <h3>Why is the range wide?</h3>
            <p>
              The low and high values intentionally cover meaningful differences in finish quality,
              complexity, market pricing, and hidden scope. Narrow it by defining materials and included work before requesting bids.
            </p>
          </article>
          <article className={styles.faq}>
            <h3>How should I compare contractor quotes?</h3>
            <p>
              Compare written scope, quantities, product allowances, demolition, cleanup, permits,
              schedule, warranty, payment terms, and change-order rules—not only the total price.
            </p>
          </article>
        </div>
      </section>

      <section>
        <div className={styles.sectionHeading}>
          <span className="eyebrow">Continue planning</span>
          <h2>Related home-project calculators</h2>
        </div>
        <div className={styles.relatedGrid}>
          {relatedProjects.map((related) => (
            <Link className={styles.relatedCard} href={`/calculators/${related.slug}`} key={related.slug}>
              <span>{related.category}</span>
              <h3>{related.title}</h3>
              <p>{related.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
