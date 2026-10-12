"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_IN_OUT } from "@/lib/motion";

/**
 * Word-level masked reveal. Each word rides up behind an overflow-hidden clip
 * so the line appears to be stripped in rather than faded.
 *
 * Sizing is driven by the caller via `sizeClasses`; this primitive never sets
 * its own type scale. Display italics get `.italic-safe` for descender clearance.
 */
export default function SplitHeading({
  lines,
  sizeClasses,
  as: Tag = "h2",
  delay = 0,
  className = "",
}: {
  lines: string[];
  sizeClasses: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={`${sizeClasses} font-display font-semibold tracking-[-0.035em] ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.045, delayChildren: delay } },
      }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.06em]">
          {line.split(" ").map((word, wi) => (
            /* align-top, not align-bottom: these wrappers must collapse to the
               height of one line so the overflow mask clips exactly one line. */
            <span key={wi} className="inline-block overflow-hidden align-top">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: reduced ? 0 : "108%", opacity: reduced ? 0 : 1 },
                  show: {
                    y: "0%",
                    opacity: 1,
                    transition: { duration: 0.8, ease: EASE_IN_OUT },
                  },
                }}
              >
                {word}
              </motion.span>
              {wi < line.split(" ").length - 1 ? <span>&nbsp;</span> : null}
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
