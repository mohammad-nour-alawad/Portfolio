export const dynamic = "force-static";

import { absoluteLocaleUrl, localeAlternates } from "@/app/lib/site";

export default function sitemap() {
  const alternates = { languages: localeAlternates() };

  return ["en", "ar", "ru"].map((locale) => ({
    url: absoluteLocaleUrl(locale),
    lastModified: "2026-10-02",
    alternates
  }));
}
