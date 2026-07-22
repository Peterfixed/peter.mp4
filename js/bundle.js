/**
 * bundle.js
 * All modules combined into a single file so the site works
 * when opened directly via file:// (no server required).
 */

/* ============================================================
   DATA
   ============================================================ */
function getYouTubeId(url) {
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

const projects = [
  {
    id: "contact-me-showreel",
    title: "Contact Me Showreel",
    thumbnail: "",
    youtube: "https://youtu.be/AIvBQ2YxYQU",
    description:
      "A personal showreel demonstrating editing and motion design range — built to show rhythm, pacing and visual storytelling across different moods and genres.",
    software: ["Adobe Premiere Pro", "Adobe After Effects"],
    style: "Dynamic storytelling edit",
    role: "Editor & Motion Designer",
    accent: "red",
  },
  {
    id: "roblox-intro-motion",
    title: "Roblox Intro Motion",
    thumbnail: "",
    youtube: "https://youtu.be/uMVEi3GXrt8",
    description:
      "An energetic animated intro sequence for a Roblox gaming project — fast cuts, punchy sound design sync and bold kinetic type to hook viewers instantly.",
    software: ["Adobe Premiere Pro", "Adobe After Effects"],
    style: "Gaming motion graphics",
    role: "Editor & Motion Designer",
    accent: "red",
  },
  {
    id: "roblox-99nights-intro",
    title: "Roblox 99 Nights Intro",
    thumbnail: "",
    youtube: "https://youtu.be/CvDrjwSs8lA",
    description:
      "A Roblox intro of 99 nights in a viral style of edition.",
    software: ["Adobe Premiere Pro", "Adobe After Effects"],
    style: "Gaming motion graphics",
    role: "Editor & Motion Designer",
    accent: "red",
  },
];

projects.forEach((p) => {
  p.youtubeId = getYouTubeId(p.youtube);
  if (!p.thumbnail && p.youtubeId) {
    p.thumbnail = `https://img.youtube.com/vi/${p.youtubeId}/hqdefault.jpg`;
  }
});

/* ============================================================
   LOADING SCREEN
   ============================================================ */
const LOADING_MESSAGES = [
  "Loading assets...",
  "Rendering...",
  "Adding motion...",
  "Almost ready...",
  "Press Start.",
];

function runLoadingScreen(onDone) {
  const screen = document.getElementById("loadingScreen");
  const barFill = document.getElementById("loadingBarFill");
  const msgEl = document.getElementById("loadingMsg");
  const percentEl = document.getElementById("loadingPercent");

  if (!screen) { onDone && onDone(); return; }

  let progress = 0;
  let msgIndex = 0;
  msgEl.textContent = LOADING_MESSAGES[0];

  const step = () => {
    const inc = 3 + Math.random() * 9;
    progress = Math.min(100, progress + inc);
    barFill.style.width = progress + "%";
    percentEl.textContent = Math.floor(progress) + "%";

    const targetMsgIndex = Math.min(
      LOADING_MESSAGES.length - 1,
      Math.floor((progress / 100) * LOADING_MESSAGES.length)
    );
    if (targetMsgIndex !== msgIndex) {
      msgIndex = targetMsgIndex;
      msgEl.textContent = LOADING_MESSAGES[msgIndex];
    }

    if (progress < 100) {
      setTimeout(step, 140 + Math.random() * 160);
    } else {
      msgEl.textContent = LOADING_MESSAGES[LOADING_MESSAGES.length - 1];
      setTimeout(finish, 550);
    }
  };

  const finish = () => {
    screen.classList.add("is-leaving");
    setTimeout(() => {
      screen.style.display = "none";
      document.body.classList.add("is-revealed");
      onDone && onDone();
    }, 900);
  };

  setTimeout(step, 300);
}

/* ============================================================
   CURSOR
   ============================================================ */
function initCursor() {
  const cursor = document.getElementById("pixelCursor");
  if (!cursor || matchMedia("(hover: none), (pointer: coarse)").matches) return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let ringX = x;
  let ringY = y;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  });

  const ring = cursor.querySelector(".pixel-cursor__ring");

  const animate = () => {
    ringX += (x - ringX) * 0.18;
    ringY += (y - ringY) * 0.18;
    ring.style.transform = `translate(${ringX - x}px, ${ringY - y}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);

  const hoverSelector = "a, button, .install-card, .project-card, input, textarea, .section-nav__dot";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverSelector)) cursor.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverSelector)) cursor.classList.remove("is-hover");
  });
  document.addEventListener("mousedown", () => cursor.classList.add("is-down"));
  document.addEventListener("mouseup", () => cursor.classList.remove("is-down"));
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".reveal-pop, .reveal-title, .reveal-slide-left, .reveal-slide-right, .reveal-distort"
  );

  const groups = new Map();
  targets.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });

  groups.forEach((els) => {
    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 0.12, 0.6)}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function initSkillBars() {
  const bars = document.querySelectorAll(".skill-card__bar-fill");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level || "80";
          setTimeout(() => { bar.style.width = `${level}%`; }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

function initParallax() {
  const els = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!els.length) return;

  let ticking = false;
  const update = () => {
    const scrollY = window.scrollY;
    els.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      const rect = el.parentElement.getBoundingClientRect();
      const offset = (rect.top + scrollY) * speed * -0.15;
      el.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  });
  update();
}

function initActiveSectionNav() {
  const sections = Array.from(document.querySelectorAll(".section"));
  const dots = Array.from(document.querySelectorAll(".section-nav__dot"));
  if (!sections.length || !dots.length) return sections;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          dots.forEach((d) => d.classList.toggle("active", d.getAttribute("href") === `#${id}`));
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
  return sections;
}

/* ============================================================
   PORTFOLIO
   ============================================================ */
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

  const open = () => openProjectModal(project);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });

  return card;
}

function renderPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;
  grid.innerHTML = "";
  projects.forEach((project) => grid.appendChild(renderCard(project)));
  Array.from(grid.children).forEach((card, i) => {
    card.classList.add("reveal-pop");
    card.style.transitionDelay = `${Math.min(i * 0.1, 0.4)}s`;
  });
}

function openProjectModal(project) {
  const modal = document.getElementById("projectModal");
  const videoEl = document.getElementById("modalVideo");

  videoEl.innerHTML = `
    <div style="position:relative;width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;">
      <img src="${project.thumbnail}" alt="${project.title}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.4;" />
      <a href="${project.youtube}" target="_blank" rel="noopener noreferrer"
        style="position:relative;z-index:2;display:inline-flex;align-items:center;gap:0.8rem;background:#ff0000;color:#fff;font-family:var(--font-display);font-size:1.1rem;font-weight:700;padding:1rem 2rem;border-radius:999px;border:3px solid #fff;box-shadow:0 6px 24px rgba(0,0,0,0.6);text-decoration:none;transition:transform 0.2s ease;"
        onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
        Assistir no YouTube
      </a>
    </div>
  `;

  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDesc").textContent = project.description;
  document.getElementById("modalStyle").textContent = project.style;
  document.getElementById("modalRole").textContent = project.role;
  document.getElementById("modalSoftware").textContent = project.software.join(" + ");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.getElementById("modalVideo").innerHTML = "";
  document.body.style.overflow = "";
}

function initModalControls() {
  document.getElementById("modalClose").addEventListener("click", closeProjectModal);
  document.getElementById("modalBackdrop").addEventListener("click", closeProjectModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.getElementById("projectModal").classList.contains("is-open"))
      closeProjectModal();
  });
}

/* ============================================================
   CONTACT
   ============================================================ */
const EMAIL = "eusoupeter.contato@gmail.com";
const SUBJECT = "Video Editing Inquiry";
const BODY =
  "Olá Peter!\n\nVi o seu portfólio e tenho interesse em trabalhar com você.\n\nDetalhes do Projeto:\nOrçamento:\nPrazo:\n\nAguardo o seu retorno!";

const TOAST_MESSAGES = ["Need an editor?", "New project?", "Let's work together!"];

function initContactEmail() {
  const btn = document.getElementById("emailBtn");
  if (!btn) return;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
  btn.setAttribute("href", mailto);
}

function initContactToasts() {
  const contactSection = document.getElementById("contact");
  const stack = document.getElementById("toastStack");
  if (!contactSection || !stack) return;

  let fired = false;
  const spawnToast = (msg, delay) => {
    setTimeout(() => {
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = msg;
      stack.appendChild(toast);
      setTimeout(() => toast.remove(), 3300);
    }, delay);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          TOAST_MESSAGES.forEach((msg, i) => spawnToast(msg, i * 900));
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(contactSection);
}

/* ============================================================
   EASTER EGG
   ============================================================ */
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function initEasterEgg() {
  const overlay = document.getElementById("easterEgg");
  if (!overlay) return;

  const trigger = () => {
    overlay.classList.add("is-active");
    setTimeout(() => overlay.classList.remove("is-active"), 2600);
  };

  let buffer = [];
  window.addEventListener("keydown", (e) => {
    buffer.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    buffer = buffer.slice(-KONAMI.length);
    if (buffer.length === KONAMI.length && buffer.every((k, i) => k === KONAMI[i])) {
      trigger(); buffer = [];
    }
  });

  const heroTitle = document.querySelector(".hero__title");
  if (heroTitle) {
    let clicks = 0, resetTimer = null;
    heroTitle.addEventListener("click", () => {
      clicks++;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => (clicks = 0), 900);
      if (clicks >= 5) { trigger(); clicks = 0; }
    });
  }
  overlay.addEventListener("click", () => overlay.classList.remove("is-active"));
}

function initKeyboardNav(sections) {
  if (!sections || !sections.length) return;
  window.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    if (document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    const scrollY = window.scrollY + 10;
    let currentIndex = sections.findIndex((s) => {
      const rect = s.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      return scrollY >= top && scrollY < top + rect.height;
    });
    if (currentIndex === -1) currentIndex = 0;

    let targetIndex = currentIndex;
    if (e.key === "ArrowDown") targetIndex = Math.min(sections.length - 1, currentIndex + 1);
    if (e.key === "ArrowUp") targetIndex = Math.max(0, currentIndex - 1);

    if (targetIndex !== currentIndex) {
      e.preventDefault();
      sections[targetIndex].scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* ============================================================
   PARTICLES
   ============================================================ */
function spawnPixelParticles(container, count = 18) {
  if (!container) return;
  const colors = ["red", "yellow", "pink", "cyan", "green", "purple"];
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "pixel-particle";
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.background = `var(--${color})`;
    p.style.left = Math.random() * 100 + "%";
    p.style.bottom = "-10px";
    p.style.animationDuration = 6 + Math.random() * 10 + "s";
    p.style.animationDelay = Math.random() * 10 + "s";
    p.style.opacity = 0.3 + Math.random() * 0.4;
    const size = 3 + Math.random() * 5;
    p.style.width = size + "px";
    p.style.height = size + "px";
    container.appendChild(p);
  }
}

/* ============================================================
   LANGUAGE / i18n
   ============================================================ */
const translations = {
  en: {
    /* Hero */
    "hero-tag": "▸ REEL 001 · PLAY",
    "hero-cta": "Watch the Reel",
    /* About */
    "about-tag": "ABOUT_PETER.TXT",
    "about-title": "About the Editor",
    "about-intro": "Hey, I'm <strong>Peter</strong> a video editor & motion designer who treats every cut like a tiny piece of storytelling. I grew up between anime openings, indie games and way too many hours in After Effects, and it shows in everything I make.",
    "step1-title": "How it Started",
    "step1-desc": "Started recording videos and making edits and gaming clips and fell in love with editing.",
    "step2-title": "Evolution in Motion Design",
    "step2-desc": "Started diving deeper into After Effects, learning how to edit and create motion.",
    "step3-title": "Freelance & Clients",
    "step3-desc": "Started collaborating with creators & gaming projects, delivering showreels and intros that hook.",
    "step4-title": "Now",
    "step4-desc": "Building my own style, creative, story-driven one project at a time. That's where you come in.",
    /* Skills */
    "skills-subtitle": "tools & skills · v2.0.4 · 100% retro-compatible",
    "craft-tag": "Craft Module",
    "lang-pt-name": "Portuguese",
    "lang-pt-tag": "Native",
    "lang-en-tag": "Intermediate",
    /* Portfolio */
    "portfolio-title": "Selected Work",
    "portfolio-hint": "click to open",
    /* Contact */
    "contact-title": "Let's Talk",
    "bubble-1": "Need an editor?",
    "bubble-2": "New project?",
    "bubble-3": "Let's work together!",
    "btn-twitter": "Message on X",
    "btn-email": "Send an Email",
    /* Footer */
    "footer-built": "built frame by frame.",
    "footer-hint": "psst… try the arrow keys, or an old cheat code 👀",
  },
  pt: {
    /* Hero */
    "hero-tag": "▸ REEL 001 · PLAY",
    "hero-cta": "Assistir ao Reel",
    /* About */
    "about-tag": "SOBRE_PETER.TXT",
    "about-title": "Sobre o Editor",
    "about-intro": "Oi, eu sou o <strong>Peter</strong> editor de vídeo & motion designer que trata cada corte como um pequeno pedaço de storytelling. Cresci entre aberturas de animes, jogos indie e horas demais no After Effects, e isso aparece em tudo que faço.",
    "step1-title": "Início na Edição",
    "step1-desc": "Comecei gravando videos e fazendo edits e clipes de games onde gostei muito de editar.",
    "step2-title": "Evolução no Motion Design",
    "step2-desc": "comecei a me aprofundar no After Effects onde aprendi a editar videos.",
    "step3-title": "Freelance & Clientes",
    "step3-desc": "Comecei a colaborar com criadores e projetos de games, entregando showreels e intros que prendem.",
    "step4-title": "Agora",
    "step4-desc": "Construindo um estilo próprio, criativo, guiado pela narrativa um projeto de cada vez. É aí que você entra.",
    /* Skills */
    "skills-subtitle": "ferramentas e habilidades · v2.0.4 · 100% retro-compatível",
    "craft-tag": "Módulo Craft",
    "lang-pt-name": "Português",
    "lang-pt-tag": "Nativo",
    "lang-en-tag": "Intermediário",
    /* Portfolio */
    "portfolio-title": "Trabalhos Selecionados",
    "portfolio-hint": "clique para abrir",
    /* Contact */
    "contact-title": "Vamos Falar",
    "bubble-1": "Precisa de um editor?",
    "bubble-2": "Novo projeto?",
    "bubble-3": "Vamos trabalhar juntos!",
    "btn-twitter": "Mensagem no X",
    "btn-email": "Enviar um Email",
    /* Footer */
    "footer-built": "construído quadro a quadro.",
    "footer-hint": "psst… tente as setas do teclado, ou um velho cheat code 👀",
  },
};

let currentLang = localStorage.getItem("peter-lang") || "en";

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("peter-lang", lang);

  const t = translations[lang];

  /* Plain text elements */
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  /* HTML elements (e.g. about intro with <strong>) */
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  /* Toggle button label */
  const flag = document.getElementById("langFlag");
  const text = document.getElementById("langText");
  if (text) text.textContent = lang === "en" ? "EN" : "PT";


  /* Update email body language */
  const btn = document.getElementById("emailBtn");
  if (btn) {
    const EMAIL = "eusoupeter.contato@gmail.com";
    const subject = lang === "pt" ? "Proposta de Projeto" : "Video Editing Inquiry";
    const body = lang === "pt"
      ? "Olá Peter!\n\nVi o seu portfólio e tenho interesse em trabalhar com você.\n\nDetalhes do Projeto:\nOrçamento:\nPrazo:\n\nAguardo o seu retorno!"
      : "Hello Peter!\n\nI saw your portfolio and I'm interested in working with you.\n\nProject Details:\nBudget:\nDeadline:\n\nLooking forward to hearing from you!";
    btn.setAttribute("href", `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }
}

function initLanguageSwitcher() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;

  /* Apply saved or default language on load */
  applyLanguage(currentLang);

  btn.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "pt" : "en");
  });
}

/* ============================================================
   BOOT
   ============================================================ */
function boot() {
  initCursor();
  renderPortfolio();
  initModalControls();
  initContactEmail();
  initContactToasts();
  initEasterEgg();

  const sections = initActiveSectionNav();
  initKeyboardNav(sections);

  initScrollReveal();
  initSkillBars();
  initParallax();
  initLanguageSwitcher();

  spawnPixelParticles(document.getElementById("skills"), 22);
  spawnPixelParticles(document.getElementById("portfolio"), 14);

  document.getElementById("year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  runLoadingScreen(boot);
});
