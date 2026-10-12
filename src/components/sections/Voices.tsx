"use client";

import { motion, useReducedMotion } from "motion/react";
import { voices } from "@/content/site";
import SplitHeading from "@/components/primitives/SplitHeading";
import { EASE_OUT } from "@/lib/motion";

/**
 * Quotes are stacked full-width with alternating alignment, so the section
 * reads as a column of speech rather than a row of cards. Max three lines each.
 */
export default function Voices() {
  const reduced = useReducedMotion();

  return (
    <section className="border-t border-line bg-bg-soft py-24 md:py-36">
      <div className="shell">
        <div className="max-w-[24ch]">
          <SplitHeading
            lines={[voices.headline]}
            sizeClasses="text-[clamp(1.9rem,4vw,3rem)] leading-[1.04]"
          />
        </div>

        <div className="mt-16 flex flex-col gap-14 md:mt-20 md:gap-20">
          {voices.quotes.map((quote, index) => (
            <motion.figure
              key={quote.name}
              initial={{ opacity: 0, y: reduced ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT }}
              className={`max-w-[46rem] border-t border-line pt-8 ${
                index % 2 === 1 ? "md:self-end md:text-right" : "md:self-start"
              }`}
            >
              <blockquote className="text-pretty font-display text-[1.3rem] font-medium leading-[1.4] tracking-[-0.02em] text-fg md:text-[1.6rem]">
                {quote.body}
              </blockquote>
              <figcaption
                className={`mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 ${
                  index % 2 === 1 ? "md:justify-end" : ""
                }`}
              >
                <span className="font-display text-sm font-semibold tracking-[-0.01em] text-fg">
                  {quote.name}
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-muted">
                  {quote.role}, {quote.company}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
