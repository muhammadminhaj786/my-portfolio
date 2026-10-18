import type { MetadataRoute } from "next";
import { featuredProjects, projects } from "@/data/portfolio";
import { projectImages } from "@/lib/project-images";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Image sitemap entries let Google Images index the project screenshots.
  const images = [
    ...featuredProjects.flatMap((p) => [p.images.cover, p.images.detail]),
    ...projects.flatMap((p) => (p.image ? [p.image] : [])),
  ].map((key) => `${siteUrl}${projectImages[key].src}`);

  return [{ url: siteUrl, changeFrequency: "monthly", priority: 1, images }];
}
