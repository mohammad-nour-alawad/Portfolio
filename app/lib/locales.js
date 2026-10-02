import identity from "@/data/identity.json";
import links from "@/data/links.json";
import { locales } from "@/app/lib/config";

import enProfile from "@/data/en/profile.json";
import enAbout from "@/data/en/about.json";
import enExperience from "@/data/en/experience.json";
import enStudy from "@/data/en/study.json";
import enPapers from "@/data/en/papers.json";
import enReviews from "@/data/en/reviews.json";
import enUi from "@/data/en/ui.json";

import arProfile from "@/data/ar/profile.json";
import arAbout from "@/data/ar/about.json";
import arExperience from "@/data/ar/experience.json";
import arStudy from "@/data/ar/study.json";
import arPapers from "@/data/ar/papers.json";
import arReviews from "@/data/ar/reviews.json";
import arUi from "@/data/ar/ui.json";

import ruProfile from "@/data/ru/profile.json";
import ruAbout from "@/data/ru/about.json";
import ruExperience from "@/data/ru/experience.json";
import ruStudy from "@/data/ru/study.json";
import ruPapers from "@/data/ru/papers.json";
import ruReviews from "@/data/ru/reviews.json";
import ruUi from "@/data/ru/ui.json";

const content = {
  en: { profile: enProfile, about: enAbout, experience: enExperience, study: enStudy, papers: enPapers, reviews: enReviews, ui: enUi },
  ar: { profile: arProfile, about: arAbout, experience: arExperience, study: arStudy, papers: arPapers, reviews: arReviews, ui: arUi },
  ru: { profile: ruProfile, about: ruAbout, experience: ruExperience, study: ruStudy, papers: ruPapers, reviews: ruReviews, ui: ruUi }
};

export function getLocaleData(locale) {
  if (!locales.includes(locale)) throw new Error(`Unsupported locale: ${locale}`);
  return { ...content[locale], identity, links, locale };
}
