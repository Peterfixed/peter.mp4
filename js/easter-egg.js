/**
 * easter-egg.js
 * Konami code (↑ ↑ ↓ ↓ ← → ← → B A) triggers a hidden animated overlay.
 * Also supports a click-based fallback: clicking the hero title 5 times fast.
 */

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function initEasterEgg() {
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
      trigger();
      buffer = [];
    }
  });

  // click-based fallback: 5 rapid clicks on the hero title
  const heroTitle = document.querySelector(".hero__title");
  if (heroTitle) {
    let clicks = 0;
    let resetTimer = null;
    heroTitle.addEventListener("click", () => {
      clicks++;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => (clicks = 0), 900);
      if (clicks >= 5) {
        trigger();
        clicks = 0;
      }
    });
  }

  overlay.addEventListener("click", () => overlay.classList.remove("is-active"));
}

/**
 * initKeyboardNav
 * ArrowDown/Up (and PageDown/Up) jump between sections for quick nav.
 */
export function initKeyboardNav(sections) {
  if (!sections || !sections.length) return;

  window.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    // avoid hijacking arrow keys used for Konami combo typing into inputs
    if (document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    const scrollY = window.scrollY + 10;
    let currentIndex = sections.findIndex((s) => {
      const rect = s.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      return scrollY >= top && scrollY < bottom;
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
