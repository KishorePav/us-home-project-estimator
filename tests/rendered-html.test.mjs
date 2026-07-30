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

test("renders production brand and canonical metadata", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", {headers: {accept: "text/html"}}),
    environment,
    executionContext,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Home Cost Compass/);
  assert.match(html, /rel="canonical" href="https:\/\/homecostcompass\.com\/"/);
  assert.match(html, />Home Cost Compass</);
  assert.doesNotMatch(html, /Project Yard/i);
  assert.match(html, /ca-pub-4845857220797420/);
});

test("renders useful calculator content, internal links, and structured data", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/calculators/kitchen-remodel", {
      headers: {accept: "text/html"},
    }),
    environment,
    executionContext,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Kitchen Remodel Cost Calculator \(2026\)/);
  assert.match(html, /Understand the range before you request quotes/);
  assert.match(html, /Kitchen Remodel cost calculator FAQ/);
  assert.match(html, /href="\/calculators\/flooring"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/homecostcompass\.com\/calculators\/kitchen-remodel"/,
  );
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
