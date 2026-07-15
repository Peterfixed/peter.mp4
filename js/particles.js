/**
 * particles.js
 * Spawns drifting pixel particles inside a container to keep backgrounds
 * alive (used in skills + portfolio sections).
 */

export function spawnPixelParticles(container, count = 18) {
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
