import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/carta"],
      disallow: ["/admin", "/admin/", "/login"],
    },
  };
}
