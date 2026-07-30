import type {MetadataRoute} from "next";
import {projects} from "./project-data";

const baseUrl = "https://homecostcompass.com";
const contentUpdated = new Date("2026-07-30T00:00:00.000Z");

const staticRoutes: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  {path: "", changeFrequency: "weekly", priority: 1},
  {path: "/about", changeFrequency: "monthly", priority: 0.6},
  {path: "/methodology", changeFrequency: "monthly", priority: 0.7},
  {path: "/privacy", changeFrequency: "monthly", priority: 0.4},
  {path: "/terms", changeFrequency: "monthly", priority: 0.4},
  {path: "/roofing-debris", changeFrequency: "monthly", priority: 0.8},
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: contentUpdated,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const calculatorPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/calculators/${project.slug}`,
    lastModified: contentUpdated,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...calculatorPages];
}
