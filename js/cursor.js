/**
 * cursor.js
 * Custom retro pixel cursor that follows the mouse, grows a ring on
 * hoverable elements, and squashes slightly on click.
 */

export function initCursor() {
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

  // Slight lag on the ring for a "trailing" feel
  const dot = cursor.querySelector(".pixel-cursor__dot");
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
