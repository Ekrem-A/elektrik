import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.kiranenerji.com" },
    { url: "https://www.kiranenerji.com/blog" },
  ];
}