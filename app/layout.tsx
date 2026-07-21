import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://homecostcompass.com"),
  title: {default:"Home Cost Compass | Free US Home Project Cost Calculators",template:"%s | Home Cost Compass"},
  description:"Plan US home projects with free cost calculators, transparent assumptions, realistic budget ranges, and printable quote-comparison reports.",
  alternates:{canonical:"/"},
  openGraph:{type:"website",siteName:"Home Cost Compass",url:"https://homecostcompass.com",title:"Home Cost Compass",description:"Free, transparent US home project cost calculators and planning tools."},
  twitter:{card:"summary",title:"Home Cost Compass",description:"Free US home project cost calculators with transparent assumptions."},
  icons:{icon:"/favicon.svg"},
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en-US">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4845857220797420"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
