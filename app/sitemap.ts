import type {MetadataRoute} from "next";
import {projects} from "./project-data";
export default function sitemap():MetadataRoute.Sitemap{const base="https://homecostcompass.com",updated=new Date("2026-07-22"),routes=["","/about","/methodology","/privacy","/terms","/roofing-debris"];return [...routes.map(route=>({url:`${base}${route}`,lastModified:updated,changeFrequency:route===""?"weekly" as const:"monthly" as const,priority:route===""?1:.6})),...projects.map(project=>({url:`${base}/calculators/${project.slug}`,lastModified:updated,changeFrequency:"monthly" as const,priority:.8}))]}
