import assert from "node:assert/strict";
import test from "node:test";

test("renders production brand and canonical metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Home Cost Compass/);
  assert.match(html, /rel="canonical" href="https:\/\/homecostcompass\.com\/"/);
  assert.match(html, />Home Cost Compass</);
  assert.doesNotMatch(html, /Project Yard/i);
  assert.match(html, /ca-pub-4845857220797420/);
});

test("declares the authorized AdSense seller", async () => {
  const adsTxt = await import("node:fs/promises").then(({ readFile }) =>
    readFile(new URL("../public/ads.txt", import.meta.url), "utf8"),
  );
  assert.equal(
    adsTxt.trim(),
    "google.com, pub-4845857220797420, DIRECT, f08c47fec0942fa0",
  );
});
