/**
 * installer.js
 * Drives the "Skill Installer" OS-window: sidebar tab switching, per-card
 * install animations with a fake progress fill, and an aggregate status
 * bar that reacts as modules get "installed". Everything is presentational
 * (no real downloads) — it's a retro installer skit, not a package manager.
 */

function switchTab(installer, tabName) {
  installer.querySelectorAll(".installer__tab").forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
  installer.querySelectorAll(".installer__panel-group").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === tabName);
  });
}

function updateOverallProgress(installer) {
  const cards = Array.from(installer.querySelectorAll(".install-card__btn"));
  const done = cards.filter((b) => b.dataset.state === "done").length;
  const pct = cards.length ? Math.round((done / cards.length) * 100) : 0;

  const fill = installer.querySelector("#installerProgressFill");
  const status = installer.querySelector("#installerStatusText");
  if (fill) fill.style.width = `${pct}%`;

  if (!status) return;
  if (pct === 0) {
    status.textContent = "Ready to install creative superpowers…";
  } else if (pct < 100) {
    status.textContent = `Installing modules… ${pct}% complete`;
  } else {
    status.textContent = "All modules installed. Peter is fully operational. ✔";
  }
}

function installCard(card, installer) {
  const btn = card.querySelector(".install-card__btn");
  const meterFill = card.querySelector(".install-card__meter-fill");
  if (!btn || btn.dataset.state === "installing" || btn.dataset.state === "done") return;

  btn.dataset.state = "installing";
  btn.textContent = "Installing…";
  card.classList.add("is-installing");

  const targetLevel = meterFill ? parseInt(meterFill.dataset.level || "80", 10) : 80;
  if (meterFill) {
    meterFill.style.width = "0%";
    requestAnimationFrame(() => {
      meterFill.style.transition = `width 1.1s var(--ease-smooth)`;
      meterFill.style.width = `${targetLevel}%`;
    });
  }

  window.setTimeout(() => {
    btn.dataset.state = "done";
    btn.textContent = "Installed ✔";
    card.classList.remove("is-installing");
    card.classList.add("is-installed");
    updateOverallProgress(installer);
  }, 1150);
}

export function initInstaller() {
  const installer = document.getElementById("installer");
  if (!installer) return;

  installer.querySelectorAll(".installer__tab").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(installer, tab.dataset.tab));
  });

  installer.querySelectorAll(".install-card").forEach((card) => {
    const btn = card.querySelector(".install-card__btn");
    if (btn) btn.addEventListener("click", () => installCard(card, installer));
    // Double-click the card body also triggers install, echoing the
    // "double-click an icon" retro-desktop convention.
    card.addEventListener("dblclick", () => installCard(card, installer));
  });

  updateOverallProgress(installer);
}
