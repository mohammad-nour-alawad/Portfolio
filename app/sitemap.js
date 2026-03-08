export const dynamic = "force-static";

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return [
    {
      url: siteUrl,
      lastModified: "2026-03-08"
    }
  ];
}
