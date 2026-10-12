"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { List, Moon, Sun, X } from "@phosphor-icons/react";
import { nav, site } from "@/content/site";

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage blocked, theme still applies for this session */
    }
  }

  return { dark, toggle };
}

export default function SiteNav() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(latest / max, 1) : 0);
    });
  }, [scrollY]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const iconButton =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-bg-soft text-fg transition-colors duration-200 hover:border-accent hover:text-accent";

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/72 backdrop-blur-xl">
      <div className="shell flex h-[68px] items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center gap-3 font-display text-[0.95rem] font-semibold tracking-[-0.02em]"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-[var(--radius-small)] bg-fg text-[0.7rem] font-bold tracking-tight text-bg"
          >
            {site.monogram}
          </span>
          <span className="hidden sm:block">{site.name}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-fg-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-2 text-xs font-medium text-fg-muted lg:inline-flex">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {site.availability}
          </span>

          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={dark}
            className={iconButton}
          >
            {dark ? <Sun size={17} weight="bold" /> : <Moon size={17} weight="bold" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`${iconButton} md:hidden`}
          >
            {open ? <X size={17} weight="bold" /> : <List size={17} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="sheet"
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-col py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3.5 font-display text-lg font-semibold tracking-[-0.02em] last:border-0"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg"
              >
                Get in touch
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Reading progress. Functional state feedback, not decoration: it tells
          the visitor how much of the page is left. 1px, accent, bottom edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
}
