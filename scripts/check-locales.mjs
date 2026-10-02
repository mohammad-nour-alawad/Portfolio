import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const locales = ["en", "ar", "ru"];
const files = ["profile", "about", "experience", "study", "papers", "reviews", "ui"];

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function shape(value) {
  if (Array.isArray(value)) return value.length ? [shape(value[0])] : [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, shape(value[key])]));
  }
  return typeof value;
}

const data = {};
for (const locale of locales) {
  data[locale] = {};
  for (const file of files) data[locale][file] = await readJson(`data/${locale}/${file}.json`);
}

for (const file of files) {
  for (const locale of locales.slice(1)) {
    assert.deepEqual(shape(data[locale][file]), shape(data.en[file]), `${locale}/${file}.json does not match the English schema`);
  }
}

const identity = await readJson("data/identity.json");
const links = await readJson("data/links.json");
assert.equal(data.en.profile.name, identity.canonicalName);
assert.equal(data.ar.profile.name, identity.arabicName);
assert.equal(data.ru.profile.name, identity.russianName);

for (const locale of locales.slice(1)) {
  assert.deepEqual(data[locale].papers.map(({ title, venue }) => ({ title, venue })), data.en.papers.map(({ title, venue }) => ({ title, venue })), `Official paper titles or venues changed in ${locale}`);
  assert.deepEqual(data[locale].experience.map(({ company }) => company), data.en.experience.map(({ company }) => company), `Official company names changed in ${locale}`);
  assert.deepEqual(data[locale].study.map(({ institution }) => institution), data.en.study.map(({ institution }) => institution), `Official institution names changed in ${locale}`);
}

function assertUnique(values, label) {
  assert.equal(new Set(values).size, values.length, `Duplicate React key source in ${label}`);
}

assertUnique(links.map(({ url }) => url), "shared links");
for (const locale of locales) {
  assertUnique(data[locale].about.skills, `${locale} skills`);
  assertUnique(data[locale].papers.map(({ year, title }) => `${year}-${title}`), `${locale} papers`);
  assertUnique(data[locale].experience.map(({ company, role }) => `${company}-${role}`), `${locale} experience`);
  assertUnique(data[locale].reviews.map(({ activity, venue }) => `${activity}-${venue}`), `${locale} reviews`);

  for (const item of data[locale].experience) {
    const groups = item.galleries || (item.gallery?.length ? [{ images: item.gallery }] : []);
    for (const group of groups) assertUnique(group.images.map(({ src }) => src), `${locale} gallery ${item.company}`);
  }
}

console.log("Locale schemas, identity names, and official names are consistent.");
