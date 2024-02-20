import { MetadataRoute } from "next";
import { getAllGroupSlug } from "./[group]/group.actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = "https://onfess.online";
  const groups = await getAllGroupSlug();

  const groupsUrl: MetadataRoute.Sitemap = groups.map((group) => ({
    url: `${url}/${group.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));

  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...groupsUrl,
  ];
}
