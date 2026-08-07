import type {Metadata} from "next";
import {Footer,Header} from "../components";

const siteUrl="https://homecostcompass.com";
const pageUrl=`${siteUrl}/terms`;
const socialImage=`${siteUrl}/og-image.svg`;
const description="Read the Home Cost Compass terms of use, estimate disclaimer, accuracy limits and responsibilities for verifying local home-project costs and requirements.";

export const metadata:Metadata={
  title:"Terms & Disclaimer",
  description,
  alternates:{canonical:"/terms"},
  openGraph:{type:"website",siteName:"Home Cost Compass",url:pageUrl,title:"Home Cost Compass Terms & Disclaimer",description,images:[{url:socialImage,width:1200,height:630,alt:"Home Cost Compass terms and disclaimer"}]},
  twitter:{card:"summary_large_image",title:"Home Cost Compass Terms & Disclaimer",description,images:[socialImage]},
};

export default function Terms(){return <><Header/><main className="page"><span className="eyebrow">Terms & disclaimer</span><h1>Use estimates as a planning aid.</h1><p>By using Home Cost Compass, you agree that its calculators and content are provided for general informational and educational purposes.</p><h2>No professional advice or guarantee</h2><p>Results are not contractor bids, appraisals, inspections, engineering opinions, code determinations, tax or financial advice, or guarantees of price, savings, suitability, safety, or project outcome. Actual costs and requirements depend on location, scope, site conditions, materials, labor, permits, and market conditions.</p><h2>Your responsibility</h2><p>Verify measurements, assumptions, accepted materials, permits, insurance, licensing, warranties, contracts, financing terms, and safety requirements with appropriately qualified local professionals before committing money or beginning work.</p><h2>Availability and accuracy</h2><p>Home Cost Compass aims to provide useful planning information but does not warrant that every figure, source, feature, or calculation will always be complete, current, or error-free. The site and its content may change without notice.</p><h2>Third-party links</h2><p>Links to external sources are provided for context. Home Cost Compass does not control or endorse all content, services, or privacy practices on third-party sites.</p><h2>Last updated</h2><p>2026.</p></main><Footer/></>}
