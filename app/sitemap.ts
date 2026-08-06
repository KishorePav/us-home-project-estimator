import type {MetadataRoute} from "next";
import {costGuides} from "./guides/guide-data";
import {topicGuides} from "./guides/topic-data";
import {projects} from "./project-data";

const baseUrl = "https://homecostcompass.com";
const contentUpdated = new Date("2026-08-05T00:00:00.000Z");

const staticRoutes: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  {path: "", changeFrequency: "weekly", priority: 1},
  {path: "/guides", changeFrequency: "weekly", priority: 0.9},
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

  const guidePages: MetadataRoute.Sitemap = costGuides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(`${guide.updatedAt}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const topicGuidePages: MetadataRoute.Sitemap = topicGuides.map((guide) => ({
    url: `${baseUrl}/guides/topics/${guide.slug}`,
    lastModified: contentUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...calculatorPages, ...guidePages, ...topicGuidePages];
}
