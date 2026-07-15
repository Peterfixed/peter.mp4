# Peter.mp4 — Interactive Portfolio

A single-page, highly animated portfolio site for video editor / motion
designer **Peter.mp4**. Built with plain HTML5, CSS3, and vanilla JavaScript
(ES modules) — no build step, no backend, no dependencies.

## Preview locally

Because the JS uses ES modules (`type="module"`), open it through a local
web server rather than double-clicking the file (browsers block module
`fetch`/imports on the `file://` protocol in some cases).

From the project root, pick one of:

```bash
# Python 3
python -m http.server 5500

# Node (if you have npx)
npx serve .

# VS Code
# Right-click index.html -> "Open with Live Server"
```

Then visit `http://localhost:5500` (or whatever port your server prints).

## File structure

```
index.html              Markup for every section (hero, about, skills, portfolio, contact, modal)
css/
  reset.css             Minimal CSS reset
  variables.css         Color palette, fonts, spacing, easing tokens
  loading.css           Retro loading screen styles
  layout.css            Section layout / structural styles
  animations.css        Cursor, scroll-reveal, parallax shapes, halftone bg, turbulence filters, glitch, particles, easter egg
  components.css        Buttons, nav dots, stickers/tape, sticky notes, install cards, project cards, modal, IM window, toasts
  responsive.css         Breakpoints
js/
  data.js               ⭐ Portfolio project data — EDIT THIS to add projects
  loading.js            Loading screen sequence logic
  cursor.js             Custom pixel cursor behaviour
  scroll-reveal.js       IntersectionObserver reveal animations + parallax + active nav dot
  portfolio.js           Renders project cards from data.js, hover preview, modal
  contact.js             Mailto link builder + scroll-triggered toast bubbles
  easter-egg.js           Konami code + click easter egg, keyboard section navigation
  installer.js            Skill Installer window: tab switching + per-card install animations
  particles.js            Drifting pixel particle background effect
  main.js                 Boot sequence — imports and initializes everything after loading screen
assets/                   (empty by default — put custom images/textures here if you add any)
```

## How to add a new portfolio project

Open `js/data.js` and add a new object to the `projects` array:

```js
{
  id: "my-new-project",              // unique slug
  title: "My New Project",
  thumbnail: "",                      // leave "" to auto-use the YouTube thumbnail
  youtube: "https://youtu.be/XXXXXXXXXXX",
  description: "One or two sentences describing the project.",
  software: ["Adobe Premiere Pro", "Adobe After Effects"],
  style: "Your editing style label",
  role: "Editor & Motion Designer",
  accent: "cyan",                     // one of: red, yellow, pink, cyan, green, purple
},
```

That's it — the portfolio grid, hover preview (auto-playing muted YouTube
embed) and the click-to-open detail modal are all generated automatically
from this array. No HTML/CSS changes required.

## Notable interactive features

- Animated retro loading screen with cycling status messages and a pixel
  progress bar, then a full-screen reveal transition.
- Custom pixel cursor with a lagging ring that grows on hover.
- Parallax floating shapes, moving grids/halftone textures, speed lines,
  and drifting pixel particles — backgrounds are always in motion.
- Scroll-triggered reveal animations (pop/overshoot, slide, stagger) driven
  by `IntersectionObserver` — see `js/scroll-reveal.js`.
- Portfolio cards: hover lifts + shakes the card and starts a muted looping
  YouTube preview after a short delay; click opens a detail modal with the
  full (unmuted, with controls) video, description, software, style, role.
- Contact section styled as a retro instant-messenger window with animated
  chat bubbles, plus extra toast notifications that fire once when the
  section scrolls into view.
- Mailto link is built with `encodeURIComponent` so the subject/body are
  properly escaped — see `initContactEmail()` in `js/contact.js`.
- Easter egg: enter the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) or click the hero
  title 5 times quickly to trigger a hidden animated overlay.
- Keyboard shortcuts: Arrow Up / Arrow Down jump between sections.
- Skill Installer: a retro OS-installer window (titlebar, sidebar tabs,
  progress bar) where each skill has its own "Install" button with a fake
  progress fill and an "Installed ✔" state — see `js/installer.js`.
- Respects `prefers-reduced-motion` by shortening/disabling animations.

## Editing colors / fonts

All design tokens live in `css/variables.css` (palette, fonts, spacing,
easing curves, shadows). Section-specific accent colors are declared there
too (`--hero-accent`, `--about-accent`, etc.) if you want to re-theme a
section without touching the rest of the palette.
