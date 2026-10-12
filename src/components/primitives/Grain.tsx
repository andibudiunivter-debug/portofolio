"use client";

import { useEffect, useState } from "react";

/**
 * Full-viewport film grain. Fixed, pointer-events-none, z-index 60.
 * Never applied to a scrolling container (that repaints on every frame).
 */
export default function Grain() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
