const dataFiles = {
  profile: "data/profile.json",
  about: "data/about.json",
  experience: "data/experience.json",
  study: "data/study.json",
  papers: "data/papers.json",
  reviews: "data/reviews.json",
  links: "data/links.json"
};

const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("content");
const hero = document.getElementById("hero");

let store = {};

init();

async function init() {
  await loadData();
  renderHero();
  renderTab("about");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderTab(tab.dataset.tab);
    });
  });

  content.addEventListener("click", (event) => {
    const image = event.target.closest(".experience-image");
    if (!image) return;
    openLightbox(image.getAttribute("src"), image.getAttribute("alt") || "Expanded image");
  });
}

async function loadData() {
  const entries = await Promise.all(
    Object.entries(dataFiles).map(async ([key, path]) => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
      }
      return [key, await response.json()];
    })
  );
  store = Object.fromEntries(entries);
}

function renderHero() {
  const p = store.profile;
  hero.innerHTML = `
    <img src="${p.photo}" alt="${p.name}" />
    <div>
      <h1>${p.name}</h1>
      <p>${p.title}</p>
      <p>${p.location}</p>
      <p>${p.summary}</p>
      <a class="button-link" href="${p.cv}" target="_blank" rel="noreferrer">View CV</a>
      <div class="chips">
        ${p.highlights.map((x) => `<span class="chip">${x}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderTab(tabId) {
  if (tabId === "about") {
    const about = store.about;
    content.innerHTML = `
      <h2 class="section-title">About Me</h2>
      <div class="grid">
        <article class="card">
          <h3>Bio</h3>
          <p>${about.bio}</p>
        </article>
        <article class="card">
          <h3>Skills</h3>
          <div class="skills-bubbles">
            ${about.skills.map((s) => `<span class="skill-bubble">${s}</span>`).join("")}
          </div>
        </article>
        <article class="card">
          <h3>Languages</h3>
          <ul>${about.languages.map((l) => `<li>${l}</li>`).join("")}</ul>
        </article>
        <article class="card">
          <h3>Links</h3>
          <div class="grid link-list">
            ${store.links
              .map(
                (item) => `
                  <div class="link-item">
                    <div class="link-title">
                      <span class="link-icon" aria-hidden="true">${getLinkIcon(item.name)}</span>
                      <span>${item.name}</span>
                    </div>
                    <a class="button-link" href="${item.url}" target="_blank" rel="noreferrer">Visit</a>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      </div>
    `;
    return;
  }

  if (tabId === "hobbies") {
    const about = store.about;
    content.innerHTML = `
      <h2 class="section-title">Hobbies</h2>
      <div class="grid">
        ${about.hobbies
          .map((hobby) => {
            const item = typeof hobby === "string" ? { name: hobby, description: "" } : hobby;
            return `
              <article class="card">
                <h3>${item.name}</h3>
                ${item.description ? `<p>${item.description}</p>` : ""}
                ${
                  Array.isArray(item.links) && item.links.length
                    ? `
                  <div class="hobby-links">
                    ${item.links
                      .map(
                        (link) => `
                      <a class="hobby-link" href="${link.url}" target="_blank" rel="noreferrer">
                        <span class="link-icon" aria-hidden="true">${getProfileIcon(link.name)}</span>
                        <span>${link.name}</span>
                      </a>
                    `
                      )
                      .join("")}
                  </div>
                `
                    : ""
                }
                ${
                  item.image
                    ? `<img class="hobby-image" src="${item.image}" alt="${item.imageAlt || item.name}" onerror="this.style.display='none'" />`
                    : ""
                }
              </article>
            `;
          })
          .join("")}
      </div>
    `;
    return;
  }

  if (tabId === "experience") {
    content.innerHTML = `
      <h2 class="section-title">Work Experience</h2>
      <div class="grid">
        ${store.experience
          .map(
            (item) => `
              <article class="card">
                <h3>${item.role} · ${item.company}</h3>
                <div class="meta">${item.period} | ${item.location}</div>
                ${item.summary ? `<p>${item.summary}</p>` : ""}
                ${
                  Array.isArray(item.techStack) && item.techStack.length
                    ? `
                  <div class="skills-bubbles">
                    ${item.techStack.map((tech) => `<span class="skill-bubble">${tech}</span>`).join("")}
                  </div>
                `
                    : ""
                }
                <ul>${item.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
                ${
                  Array.isArray(item.demos) && item.demos.length
                    ? `
                  <div class="paper-links">
                    ${item.demos
                      .map(
                        (demo) => `
                      <a href="${demo.url}" target="_blank" rel="noreferrer">${demo.name || "Demo"}</a>
                    `
                      )
                      .join("")}
                  </div>
                `
                    : ""
                }
                ${
                  Array.isArray(item.gallery) && item.gallery.length
                    ? `
                  <div class="experience-gallery-wrap">
                    <h4>${item.galleryTitle || "Project Album"}</h4>
                    <div class="experience-gallery" aria-label="${item.galleryTitle || "Project Album"}">
                      ${item.gallery
                        .map(
                          (img) => `
                        <figure class="experience-shot">
                          <img class="experience-image" src="${img.src}" alt="${img.alt || item.role}" loading="lazy" />
                          ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ""}
                        </figure>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                `
                    : ""
                }
              </article>
            `
          )
          .join("")}
      </div>
    `;
    return;
  }

  if (tabId === "study") {
    content.innerHTML = `
      <h2 class="section-title">Education</h2>
      <div class="grid">
        ${store.study
          .map(
            (item) => `
              <article class="card">
                <h3>${item.degree}</h3>
                <div class="meta">${item.institution} | ${item.year}</div>
                <p>${item.field}</p>
                ${item.description ? `<p>${item.description}</p>` : ""}
                ${
                  item.image
                    ? `
                  <figure class="education-shot">
                    <img class="experience-image" src="${item.image}" alt="${item.imageAlt || item.degree}" loading="lazy" />
                    ${item.imageCaption ? `<figcaption>${item.imageCaption}</figcaption>` : ""}
                  </figure>
                `
                    : ""
                }
              </article>
            `
          )
          .join("")}
      </div>
    `;
    return;
  }

  if (tabId === "academic") {
    content.innerHTML = `
      <h2 class="section-title">Academic Activities</h2>
      <h3>Papers</h3>
      <div class="grid">
        ${store.papers
          .map(
            (item) => `
              <article class="card">
                <h3>
                  ${
                    item.presentation
                      ? `<a href="${item.presentation}" target="_blank" rel="noreferrer">${item.title}</a>`
                      : item.title
                  }
                </h3>
                <div class="meta">${item.venue} | ${item.year}</div>
                <p>${item.summary}</p>
                <div class="paper-links">
                  ${item.link ? `<a href="${item.link}" target="_blank" rel="noreferrer">Paper</a>` : ""}
                  ${item.presentation ? `<a href="${item.presentation}" target="_blank" rel="noreferrer">Presentation</a>` : ""}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
      <h3>Reviews</h3>
      <div class="grid">
        ${store.reviews
          .map(
            (item) => `
              <article class="card">
                <h3>${item.activity}</h3>
                <div class="meta">${item.venue} | ${item.year}</div>
                <p>${item.summary}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `;
    return;
  }

}

function getLinkIcon(name) {
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

function getProfileIcon(name) {
  const key = name.toLowerCase();
  if (key.includes("codechef")) return "CC";
  if (key.includes("hackerrank")) return "HR";
  if (key.includes("leetcode")) return "LC";
  return "->";
}

function ensureLightbox() {
  let lightbox = document.getElementById("image-lightbox");
  if (lightbox) return lightbox;

  lightbox = document.createElement("div");
  lightbox.id = "image-lightbox";
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close image preview">x</button>
    <img class="lightbox-image" alt="" />
  `;
  document.body.appendChild(lightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-close")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  return lightbox;
}

function openLightbox(src, alt) {
  const lightbox = ensureLightbox();
  const lightboxImage = lightbox.querySelector(".lightbox-image");
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeLightbox() {
  const lightbox = document.getElementById("image-lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("open");
  document.body.classList.remove("modal-open");
}
