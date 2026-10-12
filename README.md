# Portofolio - Frontend & UI Engineer

Static portfolio site. No database, no CMS, no server runtime. `next build`
with `output: "export"` emits a plain folder of HTML/CSS/JS you can drop on any
host (Nginx, Cloudflare Pages, Vercel, Netlify, GitHub Pages, a VPS).

Stack: Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · Motion · GSAP
ScrollTrigger · Phosphor icons · `next/font` for self-hosted typography.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes ./out  (fully static)
```

To preview the built output the way a host would serve it:

```bash
npx serve out
```

---

## Make it yours: one file

**Everything you would want to change lives in `src/content/site.ts`.**
Name, role, email, socials, hero copy, the toolbelt, the four projects, the
capability list, the process steps, the testimonials, the footer line. No
component hardcodes any of it.

Three things in that file are placeholders and must be replaced before you
publish:

1. **Identity** - `site.name`, `site.monogram`, `site.email`, `site.socials`
   all point at an invented person. The `href`s are bare `github.com` roots.
2. **Project numbers** - `projects[].facts` are illustrative figures I wrote to
   show the layout. Put your real measurements in.
3. **Testimonials** - `voices.quotes` are fictional. Replace them with real
   quotes you have permission to publish, or delete the section from
   `src/app/page.tsx`.

The same applies to the three stats in `src/components/sections/Craft.tsx`
(`stats`, marked with a SAMPLE DATA comment).

### Swapping the photographs

Images are stock URLs from `picsum.photos`, keyed by seed. Replace each `src`
with your own files and drop them in `public/`. Keep the `alt` text honest:
it is written to describe the photo, not to stuff keywords.

---

## Wiring the contact form

`src/components/sections/Contact.tsx` has all three states built and working
(idle / submitting / success / error), but the submit handler is a stub: a
static export has no server route to post to.

Swap the `await new Promise(...)` line for a real call:

```ts
await fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  headers: { Accept: "application/json" },
  body: data,
});
```

The error path is deliberate and worth keeping: it preserves what the visitor
typed and repeats your email address inline, so a failed send never loses a lead.
There is a "simulate a send failure" checkbox so you can preview that state.

---

## Design decisions worth knowing before you edit

These are enforced in code with comments at each site. Breaking them will make
the page look generated.

**Page theme lock.** The whole page is ONE theme at a time. No section inverts.
The hero is not a forced-dark block; it uses a tinted radial wash for depth.
Toggle lives in the nav and writes to `localStorage`; an inline script in
`src/app/layout.tsx` applies it before paint so there is no flash.

**One accent, audited.** A single accent colour (`--accent`) is used across the
entire page. All foreground/background pairs were measured with a WCAG 2.1
relative-luminance check that skips transparent ancestors. Measured values are
recorded in comments in `src/app/globals.css`. If you change a theme colour,
re-measure: `--fg-faint` and `--accent` have almost no headroom on purpose.

**Radii come from tokens.** `--radius-card` (18px) for cards and images,
`--radius-small` (10px) for inputs and code spans, `border-radius: 9999px` for
interactive pills. Nothing else.

**One marquee, and it earns its place.** The toolbelt is a genuine
breadth-of-tools list, which is what marquees are good at. It pauses on hover.

**One eyebrow per section, at most.** There is a mechanical cap of
`ceil(sections / 3)` small uppercase-tracked labels. There are currently none.

**Motion respects the user.** `prefers-reduced-motion: reduce` collapses every
animation, kills the marquee, and disables the GSAP pin (the Process steps
render in their final state with no pin). `prefers-reduced-transparency: reduce`
makes the glass nav opaque.

**GSAP is lazy-loaded.** ScrollTrigger is pulled in via dynamic `import()` only
when the Process section mounts, so it stays out of the initial bundle.

---

## Verification

Every claim above was measured, not eyeballed. The checks that were run:

| Check | Method | Result |
|---|---|---|
| Routes | `curl` status | `/` 200, `/_not-found` 200 |
| JS errors | console buffer across full-page scroll | 0 errors, 0 warnings |
| Horizontal overflow | `documentElement.scrollWidth` vs `innerWidth` | equal at 360 / 414 / 768 / 1280 |
| Headline wrap | rendered line boxes / line-height | 2 lines at 360, 375, 414, 640, 768, 1024, 1280, 1440 |
| Tap targets | WCAG 2.2 24px minimum, box incl. container | 0 violations |
| Contrast | WCAG 2.1 ratio, both themes, canvas-resolved colours | 0 failing pairs (with a planted 1:1 negative control that was caught) |
| Tap/keyboard | `:focus-visible` outline on all controls | present |
| Contact form | filled, submitted, error path, success path, reset | all four verified |
| Playground drag | pointer drag, measured `getBoundingClientRect` delta | dx 339, dy 263 |
| GSAP pin | scroll scan for `position: fixed` + top 0 | pinned 5600 to 7164 |
| GSAP scrub | step opacity + rail `scaleY` inside the pin | rail 0 to 1, steps stagger 0.18 to 1 |
| Reduced motion | rule present in the emitted stylesheet | confirmed; emulation not available in the test browser, so the JS pin-disable branch was verified by code inspection only |
| Design bans | em/en dash scan, div-built fake UI scan | clean |

Re-run the design-ban scan yourself after edits:

```bash
python3 ~/.hermes/skills/software-development/web-app-verification/scripts/check_design_bans.py \
  --src src --served http://localhost:PORT/ --ban-dash --ban-fake-ui
```

---

## Structure

```
src/
  app/
    layout.tsx          fonts, metadata, theme bootstrap script, skip link
    page.tsx            section order
    globals.css         design tokens, radii, reduced-motion, marquee
  components/
    primitives/         motion-aware building blocks
      SplitHeading      per-line masked word reveal
      ParallaxFigure    two-layer scroll parallax image
      Counter           count-up on first intersection
      Magnetic          cursor-follow micro-physics
      SpotlightCard     cursor-tracked border wash (CSS custom props, no re-render)
      Button, Grain
    sections/           one file per page section
  content/site.ts       ALL COPY LIVES HERE
  lib/motion.ts         shared easing and spring constants
```
