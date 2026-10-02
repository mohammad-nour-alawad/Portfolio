export const locales = ["en", "ar", "ru"];

export const localeConfig = {
  en: { lang: "en", dir: "ltr", path: "/", label: "EN", ogLocale: "en_US" },
  ar: { lang: "ar", dir: "rtl", path: "/ar/", label: "العربية", ogLocale: "ar_AR" },
  ru: { lang: "ru", dir: "ltr", path: "/ru/", label: "RU", ogLocale: "ru_RU" }
};

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohammad-nour-alawad.github.io/Portfolio").replace(/\/$/, "");
