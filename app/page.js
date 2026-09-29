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
const heroProfileNames = ["Google Scholar", "Scopus", "LinkedIn", "Telegram"];

function withBasePath(path) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${basePath}/${path.replace(/^\//, "")}`;
}

function SocialIcon({ name }) {
  const key = name.toLowerCase();
  const iconClass = "h-[18px] w-[18px]";

  if (key.includes("github")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.9 1.54 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.12-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (key.includes("researchgate")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5Z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5Z" />
      </svg>
    );
  }

  if (key.includes("orcid")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="9" r="2" />
        <path d="M8.5 17c.7-2.1 1.9-3.2 3.5-3.2s2.8 1.1 3.5 3.2" />
      </svg>
    );
  }

  if (key.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (key.includes("telegram")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21 3-7.5 18-4.2-7.1L3 10.5Z" />
        <path d="m9.3 13.9 4.8-4.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
    </svg>
  );
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

function ExperienceGalleries({ item, onOpen, featured = false }) {
  const groups = Array.isArray(item.galleries)
    ? item.galleries
    : Array.isArray(item.gallery) && item.gallery.length > 0
      ? [{ title: item.galleryTitle, images: item.gallery }]
      : [];

  if (groups.length === 0) return null;

  return (
    <div className={featured ? "grid gap-4 lg:grid-cols-[2fr_1fr]" : "space-y-4"}>
      {groups.map((group) => (
        <section
          key={group.title || group.images[0]?.src}
          className="rounded-2xl border p-3"
          style={{ borderColor: "var(--stroke)" }}
        >
          {group.title ? <h4 className="text-sm font-bold">{group.title}</h4> : null}
          {group.description ? <p className="mt-1 text-xs text-muted">{group.description}</p> : null}
          <div
            className={`mt-3 grid gap-2 ${
              group.images.length <= 2
                ? "grid-cols-2"
                : featured
                  ? "grid-cols-3 sm:grid-cols-4 xl:grid-cols-5"
                  : "grid-cols-3"
            }`}
          >
            {group.images.map((image) => (
              <ClickableImage
                key={image.src}
                src={withBasePath(image.src)}
                alt={image.alt || group.title || item.role}
                className={featured ? "h-24 w-full object-cover sm:h-28" : "h-20 w-full object-cover"}
                onOpen={onOpen}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
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

  const paperYears = useMemo(
    () => [...new Set(papers.map((item) => item.year))].sort((a, b) => Number(b) - Number(a)),
    []
  );

  const featuredExperience = experience.find((item) => item.featured) || experience[0];
  const previousExperience = experience.filter((item) => item !== featuredExperience);
  const heroProfileLinks = heroProfileNames
    .map((name) => links.find((item) => item.name === name))
    .filter(Boolean);
  const otherSocialLinks = links.filter((item) => !heroProfileNames.includes(item.name));

  return (
    <main className="mx-auto w-[min(1260px,calc(100%-1.5rem))] py-5 md:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <header
        className="surface animate-rise sticky top-3 z-30 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3"
        style={{ animationDelay: "60ms" }}
      >
        <a href="#top" className="order-1 text-sm font-black tracking-wide md:text-base">
          {profile.name}
        </a>
        <nav
          aria-label="Main sections"
          className="order-3 flex w-full flex-nowrap justify-between gap-1 text-[11px] font-medium sm:justify-start sm:gap-2 sm:text-sm md:order-2 md:w-auto"
        >
          {["About", "Experience", "Research", "Education", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="whitespace-nowrap rounded-full border px-2 py-1.5 transition hover:-translate-y-0.5 sm:px-3"
              style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="order-2 md:order-3">
          <ThemeToggle />
        </div>
      </header>

      <section id="top" className="surface animate-rise grid gap-4 rounded-3xl p-4 md:grid-cols-[1.25fr_0.75fr] md:p-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {profile.researchDirection || profile.title}
          </p>
          <h1 className="text-3xl font-black leading-[1.02] md:text-5xl">{profile.name}</h1>
          <p className="mt-2 text-sm font-semibold md:text-base">{profile.title}</p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{profile.summary}</p>
          <p className="mt-2 text-sm text-muted">{profile.location}</p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href={withBasePath(profile.cv)} target="_blank" rel="noreferrer" className="btn-primary rounded-xl px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5">
              View CV
            </a>
            {heroProfileLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border px-3 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
                style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
              >
                {item.name === "Google Scholar" ? "Scholar" : item.name}
              </a>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {profile.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border px-2.5 py-1 text-xs font-semibold"
                style={{
                  borderColor: "var(--stroke)",
                  color: "var(--muted)"
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <VisitCounter />
        </div>

        <div className="animate-fade-in flex items-center justify-center md:justify-end">
          <ClickableImage
            src={withBasePath(profile.photo)}
            alt={profile.name}
            className="h-[290px] w-[260px] max-w-full object-cover sm:w-[300px] md:h-[320px]"
            onOpen={(src, alt) => setLightbox({ src, alt })}
          />
        </div>
      </section>

      <section id="about" className="surface animate-rise mt-4 scroll-mt-32 rounded-3xl p-5 md:scroll-mt-24" style={{ animationDelay: "120ms" }}>
        <h2 className="text-2xl font-bold md:text-3xl">About</h2>
        <p className="mt-2 leading-relaxed text-muted">{about.bio}</p>
        {about.supervision ? <p className="mt-3 text-sm leading-relaxed text-muted">{about.supervision}</p> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {about.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border px-2.5 py-1 text-xs font-medium text-muted"
              style={{ borderColor: "var(--stroke)" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <div className="flex flex-col">
      <section id="research" className="order-2 mt-8 scroll-mt-32 md:scroll-mt-24">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Selected publications</p>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">Research</h2>
        </div>

        <div className="scrollbar-thin flex snap-x gap-5 overflow-x-auto pb-4">
          {paperYears.map((year) => (
            <section
              key={year}
              aria-labelledby={`publications-${year}`}
              className="min-w-[min(88vw,520px)] snap-start md:min-w-[480px] lg:min-w-[520px]"
            >
              <div className="mb-3 flex items-center gap-3">
                <h3 id={`publications-${year}`} className="text-sm font-bold tracking-widest text-accent">
                  {year}
                </h3>
                <span className="h-px flex-1" style={{ background: "var(--stroke)" }} />
              </div>

              <div className="scrollbar-thin h-[600px] space-y-3 overflow-y-auto pr-2 md:h-[640px]">
                {papers
                  .filter((item) => item.year === year)
                  .map((item) => (
                    <article
                      className="surface formal-ring flex flex-col rounded-2xl p-4"
                      key={`${item.year}-${item.title}`}
                    >
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-widest text-accent">
                        <span>Publication</span>
                        <span>{item.year}</span>
                      </div>
                      <h4 className="mt-2 text-base font-bold leading-snug md:text-lg">{item.title}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted">{item.venue}</p>
                      <p className="mt-3 text-sm leading-relaxed">{item.summary}</p>

                      {item.link || item.presentation ? (
                        <div className="mt-auto flex flex-wrap gap-2 pt-4">
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-secondary rounded-lg px-3 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5"
                            >
                              Paper
                            </a>
                          ) : null}
                          {item.presentation ? (
                            <a
                              href={item.presentation}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5"
                              style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
                            >
                              Presentation
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-8" aria-labelledby="academic-activities">
          <h3 id="academic-activities" className="text-lg font-bold">Academic activity</h3>
          <div className="mt-3 grid auto-rows-fr gap-4 md:grid-cols-2">
            {reviews.map((item) => (
              <article className="surface h-full rounded-2xl p-5" key={`${item.activity}-${item.venue}`}>
                <h4 className="font-bold">{item.activity}</h4>
                <p className="mt-1 text-sm text-muted">{item.venue}</p>
                <p className="mt-3 text-sm leading-relaxed">{item.summary}</p>
              </article>
            ))}
            <article className="surface h-full rounded-2xl p-5">
              <h4 className="font-bold">Master's Student Supervision</h4>
              <p className="mt-1 text-sm text-muted">ITMO University</p>
              <p className="mt-3 text-sm leading-relaxed">
                Supervising master's students working on coding agents, context and memory, model routing, RAG,
                and agent evaluation.
              </p>
            </article>
          </div>
        </section>
      </section>

      <section id="experience" className="order-1 mt-10 scroll-mt-32 md:scroll-mt-24">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Research + engineering</p>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">Experience</h2>
        </div>

        {featuredExperience ? (
          <article className="surface formal-ring rounded-3xl p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">Current role</p>
                <h3 className="mt-2 text-xl font-bold md:text-2xl">
                  {featuredExperience.role} <span className="font-medium text-muted">@ {featuredExperience.company}</span>
                </h3>
              </div>
              <p className="text-sm text-muted">
                {featuredExperience.period} | {featuredExperience.location}
              </p>
            </div>

            <p className="mt-4 max-w-5xl leading-relaxed text-muted">{featuredExperience.summary}</p>

            {Array.isArray(featuredExperience.focusAreas) && featuredExperience.focusAreas.length > 0 ? (
              <section className="mt-7">
                <h4 className="text-sm font-bold">Research and engineering areas</h4>
                <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {featuredExperience.focusAreas.map((area) => (
                    <article
                      key={area.title}
                      className="rounded-2xl border p-4"
                      style={{ borderColor: "var(--stroke)", background: "var(--bg-elev)" }}
                    >
                      <h5 className="font-bold leading-snug">{area.title}</h5>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{area.description}</p>
                    </article>
                  ))}
                  {Array.isArray(featuredExperience.metrics) && featuredExperience.metrics.length > 0 ? (
                    <article
                      id="research-data-scale"
                      className="flex h-[240px] scroll-mt-32 flex-col overflow-hidden rounded-2xl border p-4 md:scroll-mt-24"
                      style={{ borderColor: "var(--stroke)", background: "var(--bg-elev)" }}
                    >
                      <h5 className="font-bold leading-snug">{featuredExperience.metricsTitle || "Scale"}</h5>
                      <div
                        className="scrollbar-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-2 focus-visible:outline-none focus-visible:ring-2"
                        role="region"
                        aria-label="Research dataset details"
                        tabIndex={0}
                      >
                        {featuredExperience.metricsDescription ? (
                          <p className="text-xs leading-relaxed text-muted">
                            {featuredExperience.metricsDescription}
                          </p>
                        ) : null}
                        <div className="mt-3 grid grid-cols-2 gap-1.5">
                          {featuredExperience.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="rounded-lg border px-2.5 py-2"
                              style={{ borderColor: "var(--stroke)" }}
                            >
                              <p className="text-base font-black text-accent">{metric.value}</p>
                              <p className="mt-0.5 text-[11px] leading-tight text-muted">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </article>
                  ) : null}
                </div>
              </section>
            ) : null}

            <section className="mt-7">
              <h4 className="text-sm font-bold">Gallery</h4>
              <div className="mt-3">
                <ExperienceGalleries
                  item={featuredExperience}
                  featured
                  onOpen={(src, alt) => setLightbox({ src, alt })}
                />
              </div>
            </section>

            <div className="mt-7 border-t pt-5" style={{ borderColor: "var(--stroke)" }}>
              {Array.isArray(featuredExperience.technicalCapabilities) && featuredExperience.technicalCapabilities.length > 0 ? (
                <section id="technical-capabilities" className="scroll-mt-32 md:scroll-mt-24">
                  <h4 className="text-base font-bold">Technical capabilities</h4>
                  <p className="mt-1 max-w-4xl text-sm leading-relaxed text-muted">
                    End-to-end work spanning research prototypes, production-oriented AI platforms, model serving,
                    evaluation infrastructure, and deployment.
                  </p>
                  <div className="mt-3 grid gap-3 lg:grid-cols-3">
                    {featuredExperience.technicalCapabilities.map((capability) => (
                      <article
                        key={capability.title}
                        className="rounded-2xl border p-4"
                        style={{ borderColor: "var(--stroke)" }}
                      >
                        <h5 className="font-bold">{capability.title}</h5>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{capability.description}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {capability.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border px-2 py-0.5 text-[11px] font-medium text-muted"
                              style={{ borderColor: "var(--stroke)" }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : Array.isArray(featuredExperience.techStack) && featuredExperience.techStack.length > 0 ? (
                <section>
                  <h4 className="text-sm font-bold">Technical capabilities</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {featuredExperience.techStack.map((tech) => (
                      <span
                        className="rounded-full border px-2.5 py-1 text-xs font-medium text-muted"
                        style={{ borderColor: "var(--stroke)" }}
                        key={tech}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {Array.isArray(featuredExperience.demos) && featuredExperience.demos.length > 0 ? (
                <section className="mt-5">
                  <h4 className="text-sm font-bold">Selected demos</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {featuredExperience.demos.map((demo) => (
                      <a
                        key={demo.url}
                        href={demo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5"
                        style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
                      >
                        {demo.name || "Demo"}
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </article>
        ) : null}

        {previousExperience.length > 0 ? (
          <section className="mt-8" aria-labelledby="earlier-experience">
            <h3 id="earlier-experience" className="text-lg font-bold">Earlier roles</h3>
            <div className="mt-3 grid auto-rows-fr items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
              {previousExperience.map((item) => (
                <article className="surface flex h-[560px] flex-col overflow-hidden rounded-2xl p-5 md:h-[520px]" key={`${item.company}-${item.role}`}>
                  <h4 className="text-lg font-bold leading-snug">
                    {item.role} <span className="font-medium text-muted">@ {item.company}</span>
                  </h4>
                  <p className="mt-1 text-sm text-muted">
                    {item.period} | {item.location}
                  </p>
                  <div
                    className="scrollbar-thin mt-3 min-h-0 flex-1 overflow-y-auto pr-2 focus-visible:outline-none focus-visible:ring-2"
                    role="region"
                    aria-label={`${item.role} details`}
                    tabIndex={0}
                  >
                    <p className="text-sm leading-relaxed">{item.summary}</p>

                    {Array.isArray(item.highlights) && item.highlights.length > 0 ? (
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}

                  {Array.isArray(item.gallery) && item.gallery.length > 0 ? (
                    <div className="mt-4">
                      <ExperienceGalleries item={item} onOpen={(src, alt) => setLightbox({ src, alt })} />
                    </div>
                  ) : null}

                  {Array.isArray(item.techStack) && item.techStack.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          className="rounded-full border px-2 py-0.5 text-[11px] font-medium text-muted"
                          style={{ borderColor: "var(--stroke)" }}
                          key={tech}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {Array.isArray(item.demos) && item.demos.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.demos.map((demo) => (
                        <a
                          key={demo.url}
                          href={demo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5"
                          style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
                        >
                          {demo.name || "Demo"}
                        </a>
                      ))}
                    </div>
                  ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>
      </div>

      <section id="education" className="mt-10 scroll-mt-32 md:scroll-mt-24">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Academic background</p>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">Education</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {study.map((item) => (
            <article key={`${item.degree}-${item.year}`} className="surface animate-rise flex h-full flex-col rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold">{item.degree}</h3>
                <span
                  className="shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold text-muted"
                  style={{ borderColor: "var(--stroke)" }}
                >
                  {item.year}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-accent">{item.institution}</p>
              <p className="mt-1 text-sm font-medium">{item.field}</p>
              {item.image ? (
                <div className="mt-3 grid gap-4 sm:grid-cols-[minmax(0,1fr)_112px] sm:items-start">
                  {item.description ? <p className="text-sm leading-relaxed text-muted">{item.description}</p> : null}
                  <ClickableImage
                    src={withBasePath(item.image)}
                    alt={item.imageAlt || item.degree}
                    className="h-28 w-full object-cover sm:h-32"
                    onOpen={(src, alt) => setLightbox({ src, alt })}
                  />
                </div>
              ) : item.description ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              ) : null}
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-4 text-sm font-semibold text-accent underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                >
                  {item.linkLabel || "Program website"} →
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="surface mt-6 scroll-mt-32 rounded-3xl p-5 md:scroll-mt-24">
        <h2 className="text-2xl font-bold md:text-3xl">Contact</h2>
        <p className="mt-2 max-w-2xl text-muted">
          If you are hiring, collaborating, or discussing research, email is the fastest channel.
        </p>
        <a href="mailto:mohammadnouralawad1@gmail.com" className="btn-primary mt-4 inline-flex rounded-xl px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5">
          Contact via Email
        </a>

        <div className="scrollbar-thin mt-4 flex flex-nowrap gap-2 overflow-x-auto pb-2">
          {otherSocialLinks.map((item) => (
            <a
              href={item.url}
              key={item.url}
              target="_blank"
              rel="noreferrer"
              className="surface flex min-w-[160px] flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 transition hover:-translate-y-0.5"
            >
              <span
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border"
                style={{ borderColor: "var(--stroke)", color: "var(--muted)" }}
              >
                <SocialIcon name={item.name} />
              </span>
              <span className="text-sm font-medium leading-tight">{item.name}</span>
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
