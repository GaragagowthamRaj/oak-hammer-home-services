import type { MetadataRoute } from "next";
import { posts, services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/plans", "/projects", "/blog", "/contact", "/gift-cards"];
  return [
    ...staticRoutes.map((path) => ({
      url: `https://oakandhammer.example${path || "/"}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `https://oakandhammer.example/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `https://oakandhammer.example/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
