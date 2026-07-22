/**
 * data.js
 * -----------------------------------------------------------------------
 * Single source of truth for portfolio projects.
 *
 * TO ADD A NEW PROJECT: just push a new object into the `projects` array
 * below. No other file needs to change — the portfolio grid and the
 * project detail modal are both rendered dynamically from this data.
 *
 * Fields:
 *  - id           {string}  unique slug, used for URL hash + easter eggs
 *  - title        {string}  project title
 *  - thumbnail    {string}  path to a thumbnail image (assets/...) OR
 *                            leave "" to auto-generate a YouTube thumbnail
 *  - youtube      {string}  full YouTube URL (youtu.be or watch?v=)
 *  - description  {string}  short project description
 *  - software     {string[]} array of software names used
 *  - style        {string}  editing / motion style descriptor
 *  - role         {string}  Peter's role on the project
 *  - accent       {string}  CSS accent color var name for this card
 *                            one of: red, yellow, pink, cyan, green, purple
 * -----------------------------------------------------------------------
 */

// Utility: pull an 11-char YouTube ID out of any common URL shape.
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
    id: "roblox-intro-motion",
    title: "Roblox Intro Motion",
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

// Resolve thumbnails automatically from YouTube when not provided.
projects.forEach((p) => {
  p.youtubeId = getYouTubeId(p.youtube);
  if (!p.thumbnail && p.youtubeId) {
    p.thumbnail = `https://img.youtube.com/vi/${p.youtubeId}/hqdefault.jpg`;
  }
});

export { projects, getYouTubeId };
