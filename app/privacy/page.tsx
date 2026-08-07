import type {Metadata} from "next";
import {Footer,Header} from "../components";

const siteUrl="https://homecostcompass.com";
const pageUrl=`${siteUrl}/privacy`;
const socialImage=`${siteUrl}/og-image.svg`;
const description="Read how Home Cost Compass handles browser-local calculator inputs, Google Analytics, AdSense, cookies, consent choices and external links.";

export const metadata:Metadata={
  title:"Privacy Policy",
  description,
  alternates:{canonical:"/privacy"},
  openGraph:{type:"website",siteName:"Home Cost Compass",url:pageUrl,title:"Home Cost Compass Privacy Policy",description,images:[{url:socialImage,width:1200,height:630,alt:"Home Cost Compass privacy policy"}]},
  twitter:{card:"summary_large_image",title:"Home Cost Compass Privacy Policy",description,images:[socialImage]},
};

export default function Privacy(){return <><Header/><main className="page"><span className="eyebrow">Privacy policy</span><h1>Your project inputs stay in your browser.</h1><p>Home Cost Compass performs calculator work locally in your browser. Project dimensions, pricing choices, contractor names, and contractor quote amounts are not submitted to an account or stored in a Home Cost Compass database.</p><h2>Advertising and cookies</h2><p>Home Cost Compass uses Google AdSense to serve and measure advertising. Google and its advertising partners may use cookies, device identifiers, or similar technologies to deliver, personalize, limit, and measure ads, subject to your location and consent choices.</p><p>For visitors in the European Economic Area, United Kingdom, and Switzerland, Google&apos;s consent management platform presents choices before advertising technologies that require consent are used. You can consent, decline, or manage available purposes and vendors through that message.</p><p>You can learn how Google uses information from sites that use its services in <a href="https://policies.google.com/technologies/partner-sites" rel="noreferrer" target="_blank">Google&apos;s partner-sites policy</a>. You can also manage advertising personalization through <a href="https://myadcenter.google.com/" rel="noreferrer" target="_blank">My Ad Center</a>.</p><h2>Analytics</h2><p>Home Cost Compass uses Google Analytics 4 to understand aggregate site usage and improve the calculators. Analytics may record information such as pages viewed, browser and device details, approximate geography, traffic source, and interaction events including when a calculator is started, customized, printed, or completed.</p><p>Home Cost Compass does not send project dimensions, contractor names, or contractor quote amounts to Google Analytics. Analytics data is handled according to Google&apos;s policies and any consent choices available in your location.</p><h2>External links</h2><p>Methodology and information pages may link to third-party sources. Those websites have their own privacy practices, which Home Cost Compass does not control.</p><h2>Policy changes</h2><p>This policy is reviewed whenever advertising, analytics, forms, accounts, or other data collection changes. Material changes will be reflected on this page.</p><p><strong>Last updated:</strong> 2026.</p></main><Footer/></>}
