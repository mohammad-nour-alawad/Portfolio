import { getLocaleData } from "@/app/lib/locales";
import { localeConfig, locales, siteUrl } from "@/app/lib/config";

export function absoluteLocaleUrl(locale) {
  return `${siteUrl}${localeConfig[locale].path}`;
}

export function localeAlternates() {
  return {
    en: absoluteLocaleUrl("en"),
    ar: absoluteLocaleUrl("ar"),
    ru: absoluteLocaleUrl("ru"),
    "x-default": absoluteLocaleUrl("en")
  };
}

export function createLocaleMetadata(locale) {
  const { ui } = getLocaleData(locale);
  const config = localeConfig[locale];
  const alternateLocale = locales.filter((item) => item !== locale).map((item) => localeConfig[item].ogLocale);

  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: ui.metadata.title,
    description: ui.metadata.description,
    verification: {
      google: "Fr0SRIU0Z73_y8ojvKchxMY03dSVa7gCzh7HD8g0TVA"
    },
    keywords: [
      "Mohammad Nour Al Awad",
      "محمد نور العوض",
      "Ал Авад Мохаммад Нур",
      "AI Researcher",
      "Machine Learning Engineer",
      "Human-AI Collaboration",
      "Coding Agents",
      "Developer Personalization",
      "LLM Systems"
    ],
    alternates: {
      canonical: absoluteLocaleUrl(locale),
      languages: localeAlternates()
    },
    openGraph: {
      type: "website",
      title: ui.metadata.ogTitle,
      description: ui.metadata.ogDescription,
      url: absoluteLocaleUrl(locale),
      siteName: ui.metadata.siteName,
      locale: config.ogLocale,
      alternateLocale
    },
    twitter: {
      card: "summary_large_image",
      title: ui.metadata.ogTitle,
      description: ui.metadata.ogDescription
    }
  };
}
