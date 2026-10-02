import { siteUrl } from "@/app/lib/config";

export function createPersonJsonLd({ profile, identity, links }) {
  const alternateName = [
    identity.arabicName,
    ...identity.alternateLatinNames,
    identity.russianName
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: identity.canonicalName,
    alternateName,
    jobTitle: profile.title,
    description: profile.summary,
    url: `${siteUrl}/`,
    sameAs: links.map((item) => item.url)
  };
}
