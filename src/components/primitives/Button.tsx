"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-[transform,background-color,border-color,color] duration-200 active:translate-y-[1px] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

/* Contrast-audited pairs. Primary is accent-on-accent-fg (4.7:1 light, 6.3:1 dark).
   Outline and ghost always carry a visible border or a solid section background. */
const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:brightness-110",
  outline:
    "border border-line-strong bg-bg-soft text-fg hover:border-accent hover:text-accent",
  ghost: "border border-transparent bg-surface-2 text-fg hover:bg-surface",
};

export default function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  type = "button",
  disabled = false,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          size={16}
          weight="bold"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
}
