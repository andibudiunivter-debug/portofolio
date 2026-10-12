"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Spotlight border. The border and a soft interior wash illuminate only where
 * the cursor is, using CSS custom properties set on pointer move. No React
 * state drives the position, so there is no re-render per frame.
 */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group/spot relative isolate overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors duration-300 md:p-8 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: active
            ? "radial-gradient(320px circle at var(--mx) var(--my), var(--accent-soft), transparent 72%)"
            : undefined,
        }}
      />
      {children}
    </div>
  );
}
