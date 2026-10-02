export const dynamic = "force-static";

import { siteUrl } from "@/app/lib/config";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
