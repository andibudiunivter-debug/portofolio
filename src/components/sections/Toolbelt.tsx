"use client";

import { toolbelt } from "@/content/site";

/**
 * The one marquee on this page. It carries the toolbelt, which is genuinely a
 * breadth-of-tools list: exactly the case a marquee serves.
 *
 * Logos are real marks from Simple Icons, rendered monochrome through a CSS
 * mask so they inherit the theme colour instead of shipping brand colours that
 * clash with the locked accent. No labels under the logos.
 */
function Logo({ slug, name }: { slug: string; name: string }) {
  return (
    <li className="flex shrink-0 items-center gap-3 px-6 md:px-8">
      <span
        aria-hidden="true"
        className="block h-6 w-6 bg-fg-muted transition-colors duration-300 md:h-7 md:w-7"
        style={{
          maskImage: `url(https://cdn.simpleicons.org/${slug})`,
          WebkitMaskImage: `url(https://cdn.simpleicons.org/${slug})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
      <span className="font-display text-sm font-semibold tracking-[-0.01em] text-fg-muted md:text-base">
        {name}
      </span>
    </li>
  );
}

const labels: Record<string, string> = {
  typescript: "TypeScript",
  react: "React",
  nextdotjs: "Next.js",
  tailwindcss: "Tailwind CSS",
  greensock: "GSAP",
  motion: "Motion",
  figma: "Figma",
  vite: "Vite",
  storybook: "Storybook",
  vitest: "Vitest",
  playwright: "Playwright",
  css: "CSS",
};

export default function Toolbelt() {
  const row = toolbelt.map((slug) => ({ slug, name: labels[slug] ?? slug }));

  return (
    <section aria-label="Tools I work in" className="border-y border-line bg-bg-soft py-8">
      <div className="group relative overflow-hidden">
        {/* Edge fades keep the loop seam invisible against the section bg. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-soft to-transparent md:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-soft to-transparent md:w-32"
        />

        <ul className="marquee-track flex w-max items-center group-hover:[animation-play-state:paused]">
          {row.map((item) => (
            <Logo key={`a-${item.slug}`} {...item} />
          ))}
          {/* Second pass: aria-hidden so screen readers hear the list once. */}
          {row.map((item) => (
            <li
              key={`b-${item.slug}`}
              aria-hidden="true"
              className="flex shrink-0 items-center gap-3 px-6 md:px-8"
            >
              <span
                className="block h-6 w-6 bg-fg-muted md:h-7 md:w-7"
                style={{
                  maskImage: `url(https://cdn.simpleicons.org/${item.slug})`,
                  WebkitMaskImage: `url(https://cdn.simpleicons.org/${item.slug})`,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
              <span className="font-display text-sm font-semibold tracking-[-0.01em] text-fg-muted md:text-base">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
