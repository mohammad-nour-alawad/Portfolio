"use client";

import { useMemo, useState } from "react";
import profile from "@/data/profile.json";
import about from "@/data/about.json";
import experience from "@/data/experience.json";
import study from "@/data/study.json";
import papers from "@/data/papers.json";
import reviews from "@/data/reviews.json";
import links from "@/data/links.json";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { VisitCounter } from "@/app/components/visit-counter";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function withBasePath(path) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${basePath}/${path.replace(/^\//, "")}`;
}

function linkLabel(name) {
  const key = name.toLowerCase();
  if (key.includes("linkedin")) return "in";
  if (key.includes("github")) return "GH";
  if (key.includes("researchgate")) return "RG";
  if (key.includes("scholar")) return "GS";
  if (key.includes("scopus")) return "SC";
  if (key.includes("orcid")) return "OR";
  if (key.includes("instagram")) return "IG";
  if (key.includes("telegram")) return "TG";
  if (key.includes("youtube")) return "YT";
  return "->";
}

function ClickableImage({ src, alt, className, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src, alt)}
      className="group relative overflow-hidden rounded-xl border transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2"
      style={{ borderColor: "var(--stroke)" }}
      aria-label={`Open image: ${alt}`}
    >
      <img src={src} alt={alt} className={className} loading="lazy" />
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 px-3 py-1 text-xs font-semibold opacity-0 transition group-hover:opacity-100"
        style={{
          color: "#f8fbff",
          background: "linear-gradient(180deg, transparent, rgba(7, 17, 34, 0.72))"
        }}
      >
        Click to expand
      </span>
    </button>
  );
}

export default function HomePage() {
  const [lightbox, setLightbox] = useState(null);

  const personJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      description: profile.summary,
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
      sameAs: links.map((item) => item.url)
    }),
    []
  );

  const researchItems = useMemo(
    () => [
      ...papers.map((item) => ({ ...item, kind: "Paper" })),
      ...reviews.map((item) => ({ ...item, kind: "Academic activity" }))
    ],
    []
  );

  return (
    <main className="mx-auto w-[min(1260px,calc(100%-1.5rem))] py-5 md:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <header
        className="surface animate-rise sticky top-3 z-30 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3"
        style={{ animationDelay: "60ms" }}
      >
        <a href="#top" className="text-sm font-black tracking-wide md:text-base">
          {profile.name}
        </a>
        <nav aria-label="Main sections" className="flex flex-wrap gap-2 text-sm font-medium">
          {["Experience", "Research", "Education", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full border px-3 py-1.5 transition hover:-translate-y-0.5"
              style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
            >
              {item}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </header>

      <section id="top" className="surface animate-rise grid gap-4 rounded-3xl p-4 md:grid-cols-[1.25fr_0.75fr] md:p-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Machine Learning Engineer + PhD Student</p>
          <h1 className="text-3xl font-black leading-[1.02] md:text-5xl">{profile.name}</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted md:text-lg">{profile.summary}</p>
          <p className="mt-2 text-sm text-muted">{profile.location}</p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href={withBasePath(profile.cv)} target="_blank" rel="noreferrer" className="btn-primary rounded-xl px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5">
              View CV
            </a>
            <a href="#experience" className="btn-secondary rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5">
              Selected Work
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {profile.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border px-2.5 py-1 text-xs font-semibold"
                style={{
                  borderColor: "var(--stroke)",
                  background: "var(--accent-soft)",
                  color: "var(--accent-strong)"
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <VisitCounter />
        </div>

        <div className="animate-fade-in">
          <ClickableImage
            src={withBasePath(profile.photo)}
            alt={profile.name}
            className="h-[340px] w-full object-cover md:h-full"
            onOpen={(src, alt) => setLightbox({ src, alt })}
          />
        </div>
      </section>

      <section id="about" className="surface animate-rise mt-4 rounded-3xl p-5" style={{ animationDelay: "120ms" }}>
        <h2 className="text-2xl font-bold md:text-3xl">About</h2>
        <p className="mt-2 leading-relaxed text-muted">{about.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {about.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border px-2.5 py-1 text-xs font-semibold"
              style={{ borderColor: "var(--stroke)", background: "var(--accent-soft)" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="experience" className="mt-6">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold md:text-3xl">Experience</h2>
          <p className="text-xs text-muted">Horizontal scroll</p>
        </div>
        <div className="scrollbar-thin flex snap-x gap-3 overflow-x-auto pb-2">
          {experience.map((item) => (
            <article
              className="surface formal-ring flex h-[34rem] min-w-[325px] max-w-[325px] snap-start flex-col rounded-2xl p-4 md:min-w-[360px] md:max-w-[360px]"
              key={`${item.company}-${item.role}`}
            >
              <h3 className="text-lg font-bold leading-snug">
                {item.role} <span className="font-medium text-muted">@ {item.company}</span>
              </h3>
              <p className="mt-1 text-sm text-muted">
                {item.period} | {item.location}
              </p>

              <div className="scrollbar-thin mt-3 flex-1 space-y-3 overflow-y-auto pr-1 text-sm leading-relaxed">
                <p>{item.summary}</p>
                <ul className="list-disc space-y-1 pl-5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                {Array.isArray(item.techStack) && item.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span
                        className="rounded-full border px-2 py-0.5 text-[11px] font-semibold"
                        style={{ borderColor: "var(--stroke)", background: "var(--accent-soft)" }}
                        key={tech}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {Array.isArray(item.demos) && item.demos.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.demos.map((demo) => (
                      <a
                        key={demo.url}
                        href={demo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border px-2.5 py-1 text-xs font-semibold"
                        style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
                      >
                        {demo.name || "Demo"}
                      </a>
                    ))}
                  </div>
                )}

                {Array.isArray(item.gallery) && item.gallery.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {item.gallery.slice(0, 4).map((image) => (
                      <ClickableImage
                        key={image.src}
                        src={withBasePath(image.src)}
                        alt={image.alt || item.role}
                        className="h-28 w-full object-cover"
                        onOpen={(src, alt) => setLightbox({ src, alt })}
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="research" className="mt-6">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold md:text-3xl">Research and Academic Activities</h2>
          <p className="text-xs text-muted">Horizontal scroll</p>
        </div>

        <div className="scrollbar-thin flex snap-x gap-3 overflow-x-auto pb-2">
          {researchItems.map((item) => (
            <article
              className="surface formal-ring flex h-[31rem] min-w-[325px] max-w-[325px] snap-start flex-col rounded-2xl p-4 md:min-w-[360px] md:max-w-[360px]"
              key={`${item.kind}-${item.title || item.activity}`}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{item.kind}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug">{item.title || item.activity}</h3>
              <p className="mt-1 text-sm text-muted">
                {item.venue} | {item.year}
              </p>

              <div className="scrollbar-thin mt-3 flex-1 space-y-3 overflow-y-auto pr-1 text-sm leading-relaxed">
                <p>{item.summary}</p>
                {item.link || item.presentation ? (
                  <div className="flex flex-wrap gap-2">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border px-2.5 py-1 text-xs font-semibold"
                        style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
                      >
                        Paper
                      </a>
                    ) : null}
                    {item.presentation ? (
                      <a
                        href={item.presentation}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border px-2.5 py-1 text-xs font-semibold"
                        style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
                      >
                        Presentation
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="mt-6 space-y-3">
        <h2 className="text-2xl font-bold md:text-3xl">Education</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {study.map((item) => (
            <article key={`${item.degree}-${item.year}`} className="surface animate-rise rounded-2xl p-4">
              <h3 className="text-lg font-bold">{item.degree}</h3>
              <p className="mt-1 text-sm text-muted">
                {item.institution} | {item.year}
              </p>
              <p className="mt-2 text-sm">{item.field}</p>
              {item.description ? <p className="mt-2 text-sm text-muted">{item.description}</p> : null}
              {item.image ? (
                <div className="mt-3">
                  <ClickableImage
                    src={withBasePath(item.image)}
                    alt={item.imageAlt || item.degree}
                    className="max-h-56 w-full object-cover"
                    onOpen={(src, alt) => setLightbox({ src, alt })}
                  />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="surface mt-6 rounded-3xl p-5">
        <h2 className="text-2xl font-bold md:text-3xl">Contact</h2>
        <p className="mt-2 max-w-2xl text-muted">
          If you are hiring, collaborating, or discussing research, email is the fastest channel.
        </p>
        <a href="mailto:mohammadnouralawad1@gmail.com" className="btn-primary mt-4 inline-flex rounded-xl px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5">
          Contact via Email
        </a>

        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {links.map((item) => (
            <a
              href={item.url}
              key={item.url}
              target="_blank"
              rel="noreferrer"
              className="surface flex items-center gap-2.5 rounded-xl px-3 py-2 transition hover:-translate-y-0.5"
            >
              <span
                className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border text-xs font-semibold"
                style={{ borderColor: "var(--stroke)", background: "var(--accent-soft)", color: "var(--accent-strong)" }}
              >
                {linkLabel(item.name)}
              </span>
              <span className="text-sm">{item.name}</span>
            </a>
          ))}
        </div>
      </section>

      {lightbox ? (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border px-3 py-1 text-sm font-semibold text-white"
            style={{ borderColor: "rgba(255,255,255,0.32)" }}
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[90vh] w-auto max-w-full rounded-xl border"
            style={{ borderColor: "rgba(255,255,255,0.25)" }}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </main>
  );
}
