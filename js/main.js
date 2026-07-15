/**
 * main.js
 * Entry point — orchestrates loading screen, then boots all interactive
 * modules once the site is revealed.
 */

import { runLoadingScreen } from "./loading.js";
import { initCursor } from "./cursor.js";
import { initScrollReveal, initSkillBars, initParallax, initActiveSectionNav } from "./scroll-reveal.js";
import { renderPortfolio, initModalControls } from "./portfolio.js";
import { initContactEmail, initContactToasts } from "./contact.js";
import { initEasterEgg, initKeyboardNav } from "./easter-egg.js";
import { initInstaller } from "./installer.js";
import { spawnPixelParticles } from "./particles.js";

function boot() {
  initCursor();
  // initInstaller(); // Removed - install buttons no longer present

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

  spawnPixelParticles(document.getElementById("skills"), 22);
  spawnPixelParticles(document.getElementById("portfolio"), 14);

  document.getElementById("year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  runLoadingScreen(boot);
});
