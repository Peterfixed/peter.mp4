/**
 * contact.js
 * - Builds the mailto link with URL-encoded subject/body.
 * - Fires additional toast notification bubbles while scrolling near
 *   the contact section (in addition to the static IM bubbles).
 */

const EMAIL = "eusoupeter.contato@gmail.com";
const SUBJECT = "Video Editing Inquiry";
const BODY =
  "Hello Peter!\n\nI saw your portfolio and I'm interested in working with you.\n\nProject Details:\nBudget:\nDeadline:\n\nLooking forward to hearing from you!";

const TOAST_MESSAGES = ["Need an editor?", "New project?", "Let's work together!"];

export function initContactEmail() {
  const btn = document.getElementById("emailBtn");
  if (!btn) return;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
  btn.setAttribute("href", mailto);
}

export function initContactToasts() {
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
