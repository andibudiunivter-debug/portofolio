"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowsClockwise, HandGrabbing } from "@phosphor-icons/react";
import { playground } from "@/content/site";
import SplitHeading from "@/components/primitives/SplitHeading";
import { EASE_OUT } from "@/lib/motion";

type Tile = {
  id: string;
  title: string;
  body: string;
  /** Starting offset as a percentage of the play area. */
  x: number;
  y: number;
  span: string;
};

const tiles: Tile[] = [
  {
    id: "tokens",
    title: "Token pipeline",
    body: "One JSON source, three platforms.",
    x: 2,
    y: 4,
    span: "w-[62%] md:w-[38%]",
  },
  {
    id: "easing",
    title: "Easing lab",
    body: "Nine curves until one feels right.",
    x: 44,
    y: 22,
    span: "w-[52%] md:w-[30%]",
  },
  {
    id: "grid",
    title: "Grid breaker",
    body: "Off-grid, on purpose.",
    x: 18,
    y: 46,
    span: "w-[58%] md:w-[34%]",
  },
  {
    id: "a11y",
    title: "Focus order",
    body: "Tab through it blind.",
    x: 58,
    y: 62,
    span: "w-[50%] md:w-[28%]",
  },
];

export default function Playground() {
  const area = useRef<HTMLDivElement>(null);
  const [round, setRound] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section id="playground" className="scroll-mt-24 border-t border-line py-24 md:py-36">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[34ch]">
            <SplitHeading
              lines={[playground.headline]}
              sizeClasses="text-[clamp(1.9rem,4vw,3rem)] leading-[1.04]"
            />
            <p className="mt-5 max-w-[44ch] text-pretty text-[0.95rem] leading-relaxed text-fg-muted">
              {playground.sub}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRound((v) => v + 1)}
            className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-line-strong bg-bg-soft px-5 py-3 text-sm font-semibold text-fg transition-colors duration-200 hover:border-accent hover:text-accent active:translate-y-[1px] md:self-auto"
          >
            <ArrowsClockwise
              size={16}
              weight="bold"
              className="transition-transform duration-500 group-hover:rotate-180"
              aria-hidden="true"
            />
            Re-deal the tiles
          </button>
        </div>

        <div
          ref={area}
          className="relative mt-12 h-[26rem] overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface md:h-[30rem]"
        >
          {/* Interactive backdrop: a dot field that lights up behind the tiles. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "radial-gradient(var(--line-strong) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <span className="pointer-events-none absolute bottom-4 left-5 z-0 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-faint">
            <HandGrabbing size={13} weight="bold" aria-hidden="true" />
            {playground.hint}
          </span>

          {tiles.map((tile, index) => (
            <motion.div
              key={`${tile.id}-${round}`}
              drag={!reduced}
              dragConstraints={area}
              dragElastic={0.16}
              dragTransition={{ bounceStiffness: 320, bounceDamping: 24 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: EASE_OUT }}
              whileDrag={{ scale: 1.05, zIndex: 40, cursor: "grabbing" }}
              whileHover={reduced ? undefined : { y: -4 }}
              style={{ left: `${tile.x}%`, top: `${tile.y}%` }}
              className={`absolute z-10 touch-none rounded-[var(--radius-card)] border border-line bg-bg-soft p-4 shadow-[0_1px_2px_rgb(var(--shadow-tint)/0.05),0_18px_40px_-20px_rgb(var(--shadow-tint)/0.3)] md:p-5 ${tile.span} ${
                reduced ? "" : "cursor-grab"
              }`}
            >
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">
                {tile.title}
              </span>
              <p className="mt-2 text-pretty font-display text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-fg">
                {tile.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
