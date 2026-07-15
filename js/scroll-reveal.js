/**
 * scroll-reveal.js
 * IntersectionObserver-driven scroll animations with staggered delays.
 * Targets any element with a `reveal-*` class (see css/animations.css).
 */

export function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".reveal-pop, .reveal-title, .reveal-slide-left, .reveal-slide-right, .reveal-distort"
  );

  // Stagger siblings within the same parent container.
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

/**
 * initSkillBars
 * Animates .skill-card__bar-fill elements to their data-level width
 * when the card scrolls into view.
 */
export function initSkillBars() {
  const bars = document.querySelectorAll(".skill-card__bar-fill");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level || "80";
          setTimeout(() => {
            bar.style.width = `${level}%`;
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/**
 * initParallax
 * Simple parallax for elements with [data-parallax] using scroll position
 * relative to the viewport, applied via requestAnimationFrame for smoothness.
 */
export function initParallax() {
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
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });

  update();
}

/**
 * initActiveSectionNav
 * Highlights the current section dot in the fixed side nav and updates
 * on scroll. Also exposes section ids in DOM order for keyboard nav.
 */
export function initActiveSectionNav() {
  const sections = Array.from(document.querySelectorAll(".section"));
  const dots = Array.from(document.querySelectorAll(".section-nav__dot"));
  if (!sections.length) return sections;
  if (!dots.length) return sections;

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
