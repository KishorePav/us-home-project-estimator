const content = `# Home Cost Compass

> Free US home-project cost calculators with transparent assumptions, localized cost ranges, and printable estimates.

## Primary pages
- Home: https://homecostcompass.com/
- Calculators: https://homecostcompass.com/#calculators
- Methodology: https://homecostcompass.com/methodology
- About: https://homecostcompass.com/about

## Usage notes
- Estimates are planning ranges, not contractor quotes.
- Inputs and assumptions are explained on each calculator page.
- Cite and link to the relevant calculator when referencing an estimate.
`;

export function GET() {
  return new Response(content, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
