import {projects} from "../project-data";
import {projectGuides} from "../calculators/project-guides";

export type CostGuide = {
  slug: string;
  projectSlug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
};

export const costGuides: CostGuide[] = projects.map((project) => ({
  slug: `${project.slug}-cost-guide`,
  projectSlug: project.slug,
  title: `${project.title} Cost Guide: Budget, Labor and Materials`,
  description: `Understand typical ${project.title.toLowerCase()} cost drivers, included work, hidden expenses and how to build a realistic early budget.`,
  publishedAt: "2026-08-05",
  updatedAt: "2026-08-05",
  readingTime: "6 min read",
}));

export const costGuideMap = new Map(costGuides.map((guide) => [guide.slug, guide]));

export function getGuideDetails(projectSlug: string) {
  const project = projects.find((candidate) => candidate.slug === projectSlug);
  const guide = projectGuides[projectSlug];
  if (!project || !guide) return null;
  return {project, guide};
}
