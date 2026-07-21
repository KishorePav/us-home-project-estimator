import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Roofing Debris & Dumpster Size Calculator | Project Yard", description: "Estimate roofing tear-off weight, debris volume, dumpster size, and possible overweight charges for US asphalt-shingle roof projects.", other:{"codex-preview":"development"}, icons:{icon:"/favicon.svg"} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-US"><body>{children}</body></html>}
