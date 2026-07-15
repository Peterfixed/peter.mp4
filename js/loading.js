/**
 * loading.js
 * Handles the retro loading-screen sequence: cycling messages,
 * a chunky pixel progress bar, then a satisfying reveal transition.
 */

const MESSAGES = [
  "Loading assets...",
  "Rendering...",
  "Adding motion...",
  "Almost ready...",
  "Press Start.",
];

export function runLoadingScreen(onDone) {
  const screen = document.getElementById("loadingScreen");
  const barFill = document.getElementById("loadingBarFill");
  const msgEl = document.getElementById("loadingMsg");
  const percentEl = document.getElementById("loadingPercent");

  if (!screen) {
    onDone && onDone();
    return;
  }

  let progress = 0;
  let msgIndex = 0;
  msgEl.textContent = MESSAGES[0];

  const step = () => {
    // uneven, "handcrafted" increments so it doesn't feel like a linear bar
    const inc = 3 + Math.random() * 9;
    progress = Math.min(100, progress + inc);

    barFill.style.width = progress + "%";
    percentEl.textContent = Math.floor(progress) + "%";

    const targetMsgIndex = Math.min(
      MESSAGES.length - 1,
      Math.floor((progress / 100) * MESSAGES.length)
    );
    if (targetMsgIndex !== msgIndex) {
      msgIndex = targetMsgIndex;
      msgEl.textContent = MESSAGES[msgIndex];
    }

    if (progress < 100) {
      setTimeout(step, 140 + Math.random() * 160);
    } else {
      msgEl.textContent = MESSAGES[MESSAGES.length - 1];
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
