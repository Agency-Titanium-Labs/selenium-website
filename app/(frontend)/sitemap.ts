import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://selenium-studio.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Add other routes here as they are created, e.g.:
    // {
    //   url: `${baseUrl}/contact`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
  ];
}
