/**
 * Motion constants shared by every animated component.
 * One easing family, one spring. No linear easing anywhere.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.65, delay, ease: EASE_OUT },
});
