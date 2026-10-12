"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero, site } from "@/content/site";
import SplitHeading from "@/components/primitives/SplitHeading";
import Button from "@/components/primitives/Button";
import Magnetic from "@/components/primitives/Magnetic";
import ParallaxFigure from "@/components/primitives/ParallaxFigure";
import { EASE_OUT } from "@/lib/motion";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-[68px] md:pb-24">
      {/* Tinted wash for depth. Same theme family, never an inverted block. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-[-10%] h-[36rem] w-[36rem] rounded-full opacity-70 blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--accent-soft), transparent 68%)",
        }}
      />

      <div className="shell relative">
        {/* HERO STACK: eyebrow, headline, subtext, CTAs. Four text elements,
            nothing else. Top padding stays under the pt-24 cap. */}
        <div className="pt-14 md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fg-faint"
          >
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            <span>{site.role}</span>
          </motion.p>

          {/* The headline owns the full shell width. Constraining it to a 7/12
              column forced a four-line wrap at desktop, which is a font-scale
              error, not a copy-length problem. */}
          <div className="mt-7">
            <SplitHeading
              as="h1"
              lines={hero.headline}
              sizeClasses="text-[clamp(2.2rem,6.6vw,5.1rem)] leading-[0.98] italic-safe"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Support column: subtext + CTAs, held to a readable measure. */}
            <div className="flex flex-col justify-end lg:col-span-6 lg:pb-4">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT }}
                className="max-w-[46ch] text-pretty text-base leading-relaxed text-fg-muted md:text-lg"
              >
                {hero.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.58, ease: EASE_OUT }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Magnetic strength={0.22}>
                  <Button href={hero.primaryCta.href} arrow>
                    {hero.primaryCta.label}
                  </Button>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <Button href={hero.contactCta.href} variant="outline">
                    {hero.contactCta.label}
                  </Button>
                </Magnetic>
              </motion.div>
            </div>

            {/* Photo column, offset right so the pair is asymmetric. */}
            <div className="lg:col-span-5 lg:col-start-8">
              <motion.div
                initial={{ opacity: 0, scale: reduced ? 1 : 0.94, y: reduced ? 0 : 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.25, ease: EASE_OUT }}
                className="relative"
              >
                <ParallaxFigure
                  src={hero.image.src}
                  alt={hero.image.alt}
                  priority
                  className="aspect-[4/5] w-full"
                  overlay={
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"
                    />
                  }
                />

                <div className="lift-lg absolute -bottom-6 -left-4 w-[min(15rem,72%)] rounded-[var(--radius-card)] border border-line bg-bg-soft p-5 md:-left-8">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg-faint">
                    Currently
                  </p>
                  <p className="mt-2 font-display text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-fg">
                    Design-system rescue for two product teams
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
