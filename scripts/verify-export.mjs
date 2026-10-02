import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mohammad-nour-alawad.github.io/Portfolio").replace(/\/$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const personId = `${siteUrl}/#person`;
const routes = [
  { locale: "en", file: "out/index.html", dir: "ltr", canonical: `${siteUrl}/`, ogLocale: "en_US" },
  { locale: "ar", file: "out/ar/index.html", dir: "rtl", canonical: `${siteUrl}/ar/`, ogLocale: "ar_AR" },
  { locale: "ru", file: "out/ru/index.html", dir: "ltr", canonical: `${siteUrl}/ru/`, ogLocale: "ru_RU" }
];

const titles = [];
const descriptions = [];
for (const route of routes) {
  const html = await readFile(route.file, "utf8");
  assert.match(html, new RegExp(`<html[^>]*lang="${route.locale}"[^>]*dir="${route.dir}"`), `${route.file}: incorrect lang or dir`);
  assert.ok(html.includes(`rel="canonical" href="${route.canonical}"`), `${route.file}: incorrect canonical`);
  assert.ok(html.includes(`property="og:locale" content="${route.ogLocale}"`), `${route.file}: incorrect Open Graph locale`);
  for (const hreflang of ["en", "ar", "ru", "x-default"]) {
    assert.ok(new RegExp(`hrefLang="${hreflang}"`, "i").test(html), `${route.file}: missing ${hreflang} alternate`);
  }
  assert.ok(html.includes(`"@id":"${personId}"`), `${route.file}: missing shared Person @id`);
  assert.ok(html.includes("محمد نور العوض"), `${route.file}: missing Arabic alternate name in Person data`);
  assert.ok(html.includes("Ал Авад Мохаммад Нур"), `${route.file}: missing Russian alternate name in Person data`);
  assert.ok(!html.includes("https://example.com"), `${route.file}: contains placeholder production URL`);
  assert.ok(html.includes(`${basePath}/assets/me-2.jpg`), `${route.file}: profile asset does not include the expected basePath`);
  assert.ok(html.includes(`${basePath}/ar/`), `${route.file}: Arabic locale link does not include the expected basePath`);
  assert.ok(html.includes(`${basePath}/ru/`), `${route.file}: Russian locale link does not include the expected basePath`);
  assert.ok(html.includes(`${basePath}/_next/`), `${route.file}: Next.js assets do not include the expected basePath`);

  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  assert.ok(jsonLdMatch, `${route.file}: missing Person JSON-LD script`);
  const person = JSON.parse(jsonLdMatch[1]);
  assert.equal(person["@id"], personId, `${route.file}: malformed Person identity`);
  assert.deepEqual(person.alternateName, ["محمد نور العوض", "Ал Авад Мохаммад Нур"]);

  titles.push(html.match(/<title>([^<]+)<\/title>/)?.[1]);
  descriptions.push(html.match(/<meta name="description" content="([^"]+)"\/>/)?.[1]);
}

assert.equal(new Set(titles).size, routes.length, "Localized titles are not unique");
assert.equal(new Set(descriptions).size, routes.length, "Localized descriptions are not unique");

const sitemap = await readFile("out/sitemap.xml", "utf8");
for (const route of routes) assert.ok(sitemap.includes(route.canonical), `sitemap.xml: missing ${route.canonical}`);

console.log(`Static export verified for en, ar, and ru${basePath ? ` with basePath ${basePath}` : ""}.`);
