import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const {default: worker} = await import(workerUrl.href);
  return worker;
}

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", {status: 404}),
  },
};

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

async function fetchFromWorker(worker, path, accept = "text/html") {
  return worker.fetch(
    new Request(`http://localhost${path}`, {headers: {accept}}),
    environment,
    executionContext,
  );
}

test("renders production brand and canonical metadata", async () => {
  const worker = await loadWorker();
  const response = await fetchFromWorker(worker, "/");

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Home Cost Compass/);
  assert.match(html, /rel="canonical" href="https:\/\/homecostcompass\.com\/"/);
  assert.match(html, />Home Cost Compass</);
  assert.doesNotMatch(html, /Project Yard/i);
  assert.doesNotMatch(html, /name="robots"[^>]*noindex/i);
  assert.match(html, /ca-pub-4845857220797420/);
});

test("renders useful calculator content, internal links, and structured data", async () => {
  const worker = await loadWorker();
  const response = await fetchFromWorker(worker, "/calculators/kitchen-remodel");

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Kitchen Remodel Cost Calculator \(2026\)/);
  assert.match(html, /Understand the range before you request quotes/);
  assert.match(html, /Kitchen Remodel cost calculator FAQ/);
  assert.match(html, /href="\/calculators\/flooring"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /name="robots"[^>]*noindex/i);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/homecostcompass\.com\/calculators\/kitchen-remodel"/,
  );
});

test("publishes a complete fresh sitemap and permissive robots file", async () => {
  const worker = await loadWorker();
  const sitemapResponse = await fetchFromWorker(worker, "/sitemap.xml", "application/xml");

  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/i);
  const sitemap = await sitemapResponse.text();

  const requiredUrls = [
    "https://homecostcompass.com/",
    "https://homecostcompass.com/about",
    "https://homecostcompass.com/methodology",
    "https://homecostcompass.com/privacy",
    "https://homecostcompass.com/terms",
    "https://homecostcompass.com/roofing-debris",
    "https://homecostcompass.com/calculators/kitchen-remodel",
    "https://homecostcompass.com/calculators/bathroom-remodel",
    "https://homecostcompass.com/calculators/roof-replacement",
    "https://homecostcompass.com/calculators/flooring",
    "https://homecostcompass.com/calculators/interior-painting",
    "https://homecostcompass.com/calculators/hvac-replacement",
    "https://homecostcompass.com/calculators/electrical-work",
    "https://homecostcompass.com/calculators/plumbing",
    "https://homecostcompass.com/calculators/fence-installation",
    "https://homecostcompass.com/calculators/deck-construction",
    "https://homecostcompass.com/calculators/solar-savings",
    "https://homecostcompass.com/calculators/whole-home-renovation",
    "https://homecostcompass.com/calculators/window-replacement",
    "https://homecostcompass.com/calculators/concrete-patio",
  ];

  for (const url of requiredUrls) assert.match(sitemap, new RegExp(`<loc>${url}</loc>`));
  assert.equal((sitemap.match(/<url>/g) ?? []).length, requiredUrls.length);
  assert.match(sitemap, /<lastmod>2026-07-30T00:00:00\.000Z<\/lastmod>/);

  const robotsResponse = await fetchFromWorker(worker, "/robots.txt", "text/plain");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \//i);
  assert.match(robots, /Sitemap: https:\/\/homecostcompass\.com\/sitemap\.xml/i);
});

test("declares the authorized AdSense seller", async () => {
  const adsTxt = await import("node:fs/promises").then(({readFile}) =>
    readFile(new URL("../public/ads.txt", import.meta.url), "utf8"),
  );
  assert.equal(
    adsTxt.trim(),
    "google.com, pub-4845857220797420, DIRECT, f08c47fec0942fa0",
  );
});
