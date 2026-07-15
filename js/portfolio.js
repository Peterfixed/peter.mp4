/**
 * portfolio.js
 * Renders the portfolio grid from data.js, wires up hover-preview
 * (muted autoplay looping YouTube iframe) and click-to-open detail modal.
 * Adding a new project only requires editing js/data.js.
 */

import { projects } from "./data.js";

function buildEmbedUrl(youtubeId, { autoplay = false, mute = true, loop = true, controls = false } = {}) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    controls: controls ? "1" : "0",
    loop: loop ? "1" : "0",
    playlist: loop ? youtubeId : "",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

function renderCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.style.setProperty("--accent", `var(--${project.accent || "red"})`);
  card.dataset.id = project.id;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open ${project.title} project details`);

  card.innerHTML = `
    <div class="project-card__media reveal-distort">
      <img class="project-card__thumb" src="${project.thumbnail}" alt="${project.title} thumbnail" loading="lazy" />
      <div class="project-card__preview"></div>
      <div class="project-card__play">▶</div>
    </div>
    <div class="project-card__body">
      <span class="project-card__style">${project.style}</span>
      <h3 class="project-card__title">${project.title}</h3>
      <div class="project-card__software">
        ${project.software.map((s) => `<span>${s}</span>`).join("")}
      </div>
    </div>
  `;

  let hoverTimer = null;
  const previewEl = card.querySelector(".project-card__preview");

  card.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
      if (!previewEl.querySelector("iframe")) {
        const iframe = document.createElement("iframe");
        iframe.src = buildEmbedUrl(project.youtubeId, { autoplay: true, mute: true, loop: true });
        iframe.title = project.title + " preview";
        iframe.allow = "autoplay; encrypted-media";
        iframe.loading = "lazy";
        previewEl.appendChild(iframe);
      }
      card.classList.add("is-previewing");
    }, 350);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    card.classList.remove("is-previewing");
    // remove iframe shortly after to stop playback/sound and save resources
    setTimeout(() => {
      if (!card.classList.contains("is-previewing")) {
        previewEl.innerHTML = "";
      }
    }, 300);
  });

  const open = () => openProjectModal(project);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  return card;
}

export function renderPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;
  grid.innerHTML = "";
  projects.forEach((project) => grid.appendChild(renderCard(project)));

  // Staggered reveal-pop classes for scroll-in animation
  Array.from(grid.children).forEach((card, i) => {
    card.classList.add("reveal-pop");
    card.style.transitionDelay = `${Math.min(i * 0.1, 0.4)}s`;
  });
}

function openProjectModal(project) {
  const modal = document.getElementById("projectModal");
  const videoEl = document.getElementById("modalVideo");
  const titleEl = document.getElementById("modalTitle");
  const descEl = document.getElementById("modalDesc");
  const styleEl = document.getElementById("modalStyle");
  const roleEl = document.getElementById("modalRole");
  const softwareEl = document.getElementById("modalSoftware");

  videoEl.innerHTML = `<iframe src="${buildEmbedUrl(project.youtubeId, { autoplay: true, mute: false, loop: true, controls: true })}"
    title="${project.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  titleEl.textContent = project.title;
  descEl.textContent = project.description;
  styleEl.textContent = project.style;
  roleEl.textContent = project.role;
  softwareEl.textContent = project.software.join(" + ");

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

export function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  const videoEl = document.getElementById("modalVideo");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  videoEl.innerHTML = "";
  document.body.style.overflow = "";
}

export function initModalControls() {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.getElementById("modalClose");
  const backdrop = document.getElementById("modalBackdrop");

  closeBtn.addEventListener("click", closeProjectModal);
  backdrop.addEventListener("click", closeProjectModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeProjectModal();
  });
}
