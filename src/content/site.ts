/**
 * ALL COPY LIVES HERE. Edit this one file to make the portfolio yours.
 * Nothing in src/components/ hardcodes text, names, projects or links.
 *
 * Placeholder identity below is intentionally a realistic, locale-appropriate
 * Indonesian name rather than a "Jane Doe" filler. Replace it.
 */

export const site = {
  name: "Rafi Ardiansyah",
  monogram: "RA",
  role: "Frontend & UI Engineer",
  email: "rafi@rafiardiansyah.dev",
  locationNote: "Jakarta, GMT+7",
  availability: "Open for contract work, Q1",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/in/" },
    { label: "Read.cv", href: "https://read.cv/" },
  ],
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Craft", href: "#craft" },
  { label: "Process", href: "#process" },
  { label: "Playground", href: "#playground" },
];

export const hero = {
  /* Measured fit (not guessed). At the 360px breakpoint the content box is
     320px and the clamp floor renders at 35.2px, where one character averages
     ~17.8px. So each headline line must stay under ~17 characters to hold two
     lines on the smallest phone. Both lines below measure under 300px there. */
  headline: ["Interfaces that", "survive contact."],
  sub: "Eight years shipping product UI. I care about the last four pixels and the first four hundred milliseconds.",
  primaryCta: { label: "View work", href: "#work" },
  contactCta: { label: "Get in touch", href: "#contact" },
  image: {
    src: "https://picsum.photos/seed/rafi-frontend-desk-night/1200/1500",
    alt: "A desk at night with a mechanical keyboard, a notebook of wireframe sketches, and a monitor showing a layout grid.",
  },
};

/** Marquee toolbelt. Real brand logos only (Simple Icons CDN). */
export const toolbelt = [
  "typescript",
  "react",
  "nextdotjs",
  "tailwindcss",
  "greensock",
  "motion",
  "figma",
  "vite",
  "storybook",
  "vitest",
  "playwright",
  "css",
];

export const workIntro = {
  headline: "Selected work",
  sub: "Four products where I owned the interface end to end: design system, component layer, and the motion that ties it together.",
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  summary: string;
  /** Replace with real numbers from your own reports. */
  facts: { label: string; value: string }[];
  stack: string[];
  image: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: "titik",
    name: "Titik",
    kind: "Design system",
    year: "2025",
    summary:
      "A component library that ended four years of drift between six product squads. Tokens generated from one source of truth, shipped as a versioned package with codemods.",
    facts: [
      { label: "Components", value: "138" },
      { label: "Squads migrated", value: "6" },
      { label: "Bundle cost", value: "11 kB" },
    ],
    stack: ["TypeScript", "React", "Storybook", "Style Dictionary"],
    image: {
      src: "https://picsum.photos/seed/titik-design-system-grid/1400/900",
      alt: "Overhead photograph of printed interface specification sheets laid out on a table.",
    },
  },
  {
    slug: "saku",
    name: "Saku",
    kind: "Fintech dashboard",
    year: "2024",
    summary:
      "Personal finance app where the hard part was not the charts, it was making 40 numbers readable on a 375px screen without hiding anything behind a tap.",
    facts: [
      { label: "Weekly users", value: "62k" },
      { label: "Median load", value: "0.9 s" },
      { label: "Screens", value: "34" },
    ],
    stack: ["Next.js", "TanStack Query", "D3", "Tailwind"],
    image: {
      src: "https://picsum.photos/seed/saku-fintech-phone-hands/1400/900",
      alt: "A phone held over a light desk, screen turned away from the camera.",
    },
  },
  {
    slug: "jadwal",
    name: "Jadwal",
    kind: "Scheduling product",
    year: "2023",
    summary:
      "Calendar tooling for clinic staff. I rebuilt the drag interaction from scratch after the original library lost a booking whenever the network hiccuped mid-drag.",
    facts: [
      { label: "Bookings/day", value: "3,400" },
      { label: "Lost writes", value: "0" },
      { label: "Interaction budget", value: "16 ms" },
    ],
    stack: ["React", "Zustand", "Radix", "Motion"],
    image: {
      src: "https://picsum.photos/seed/jadwal-clinic-calendar-desk/1400/900",
      alt: "A wall planner and a laptop on a clinic reception counter.",
    },
  },
  {
    slug: "lentera",
    name: "Lentera",
    kind: "Reading app",
    year: "2022",
    summary:
      "Long-form reading for offline commuters. Typography first: measure, rhythm, and a night mode that does not turn text into a glowing rectangle.",
    facts: [
      { label: "Articles stored", value: "1.2M" },
      { label: "Offline reads", value: "78%" },
      { label: "Type scales", value: "4" },
    ],
    stack: ["Nuxt", "PWA", "IndexedDB", "Variable fonts"],
    image: {
      src: "https://picsum.photos/seed/lentera-reading-train-window/1400/900",
      alt: "A passenger reading on a tablet beside a train window at dusk.",
    },
  },
];

export const craft = {
  headline: "What I actually do",
  sub: "Five things I get hired for. The rest I hand to someone better at it.",
  items: [
    {
      title: "Design systems",
      body: "Token architecture, component APIs, and the codemods that make adoption cheap instead of optional.",
    },
    {
      title: "Interaction motion",
      body: "Scroll choreography and micro-interactions that explain state changes rather than decorating them.",
    },
    {
      title: "Performance work",
      body: "Render budgets, bundle surgery, and Core Web Vitals that survive a real 3G connection.",
    },
    {
      title: "Accessibility",
      body: "Keyboard paths, focus order, and contrast that passes an audit without a rewrite.",
    },
    {
      title: "Frontend architecture",
      body: "Feature boundaries, data-fetching strategy, and test seams that let a team of eight move.",
    },
  ],
};

export const process = {
  headline: "How the work goes",
  sub: "Same shape every time, whether the contract is three weeks or nine months.",
  steps: [
    {
      title: "Read the real brief",
      body: "Two days with the people who use the thing. Recordings beat feature lists every single time.",
    },
    {
      title: "Draw it before building it",
      body: "Sketches and a clickable shell. Cheap to throw away, expensive to skip.",
    },
    {
      title: "Build the spine first",
      body: "Layout, tokens, and data flow before a single animation. Motion on a broken grid is lipstick.",
    },
    {
      title: "Harden and hand over",
      body: "Reduced motion, empty states, error copy, docs. The unglamorous half that decides if it lasts.",
    },
  ],
};

export const voices = {
  headline: "What teams say afterwards",
  quotes: [
    {
      body: "He rewrote our component layer in six weeks and nobody filed a regression. The migration notes alone were worth the invoice.",
      name: "Dewi Prameswari",
      role: "Head of Product",
      company: "Saku",
    },
    {
      body: "Rafi is the rare frontend hire who reads the backend contract before arguing about it. Our API got simpler because of him.",
      name: "Tomas Lindqvist",
      role: "Engineering Manager",
      company: "Jadwal",
    },
    {
      body: "We asked for a design system and got a way of working. Two years on, the team still uses his token names.",
      name: "Arif Kusuma",
      role: "Design Lead",
      company: "Titik",
    },
  ],
};

export const playground = {
  headline: "Playground",
  sub: "Small things I build to test an idea. Drag the tiles, nothing here is precious.",
  hint: "Drag a tile. Release and it settles.",
};

export const contact = {
  headline: "Tell me what you are building.",
  sub: "Contract work, design-system rescue, or a second opinion on a frontend plan. I answer within two working days.",
  cta: "Get in touch",
  formNote: "This form is wired to a local handler. Point it at your own endpoint in src/components/sections/Contact.tsx.",
};

export const footer = {
  line: "Designed and built by hand. No page builder, no template.",
};
