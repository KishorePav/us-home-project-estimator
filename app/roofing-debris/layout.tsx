import type {Metadata} from "next";

const siteUrl="https://homecostcompass.com";
const pageUrl=`${siteUrl}/roofing-debris`;
const socialImage=`${siteUrl}/og-image.svg`;
const title="Roofing Debris & Dumpster Calculator";
const description="Estimate asphalt-shingle tear-off weight, loose debris volume, dumpster size and possible overweight charges before ordering a roofing container.";

export const metadata:Metadata={
  title:{absolute:title},
  description,
  alternates:{canonical:"/roofing-debris"},
  openGraph:{type:"website",siteName:"Home Cost Compass",url:pageUrl,title,description,images:[{url:socialImage,width:1200,height:630,alt:"Roofing debris and dumpster calculator"}]},
  twitter:{card:"summary_large_image",title,description,images:[socialImage]},
};

export default function RoofingDebrisLayout({children}:{children:React.ReactNode}){
  return children;
}
