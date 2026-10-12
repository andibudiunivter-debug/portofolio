"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Layered parallax: the photo moves slower than the page, and the annotation
 * card drifts past it on a different rate. Two layers, one scroll source.
 */
export default function ParallaxFigure({
  src,
  alt,
  priority = false,
  overlay,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  overlay?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.06, 1, 1.06]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[var(--radius-card)] bg-surface-2 ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        width={1200}
        height={1500}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        style={{ y, scale }}
        className="h-full w-full object-cover will-change-transform"
      />
      {overlay}
    </div>
  );
}
