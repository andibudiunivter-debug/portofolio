"use client";

import { motion, useReducedMotion } from "motion/react";
import { craft } from "@/content/site";
import SplitHeading from "@/components/primitives/SplitHeading";
import SpotlightCard from "@/components/primitives/SpotlightCard";
import Counter from "@/components/primitives/Counter";
import { EASE_OUT } from "@/lib/motion";

/* SAMPLE DATA. These are illustrative, not measured from a real audit.
   Replace with numbers from your own reports before publishing. */
const stats = [
  { value: 8, suffix: " yrs", label: "Shipping product UI" },
  { value: 34, suffix: "", label: "Products through to release" },
  { value: 96, suffix: "+", label: "Median Lighthouse performance" },
];

export default function Craft() {
  const reduced = useReducedMotion();

  return (
    <section id="craft" className="scroll-mt-24 border-t border-line bg-bg-soft py-24 md:py-36">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Sticky heading column: the list scrolls past a pinned title. */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SplitHeading
                lines={[craft.headline]}
                sizeClasses="text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02]"
              />
              <p className="mt-6 max-w-[38ch] text-pretty text-[0.95rem] leading-relaxed text-fg-muted">
                {craft.sub}
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6 lg:grid-cols-1 lg:gap-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-display text-3xl font-semibold tracking-[-0.03em] text-fg lg:text-4xl">
                      <Counter to={stat.value} />
                      {stat.suffix}
                    </dd>
                    <dt className="mt-1 max-w-[24ch] font-mono text-[0.62rem] uppercase leading-snug tracking-[0.12em] text-fg-faint">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Capability cards. This is the intentional 2-up middle row:
              two related cards sit tighter together than the page default gap. */}
          <div className="lg:col-span-8 lg:pl-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {craft.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: reduced ? 0 : 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.06, ease: EASE_OUT }}
                  className={
                    // Last card spans both columns when the count is odd.
                    index === craft.items.length - 1 && craft.items.length % 2 === 1
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <SpotlightCard className="h-full">
                    <span
                      aria-hidden="true"
                      className="block h-1 w-10 rounded-full bg-accent"
                    />
                    <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.025em] text-fg md:text-[1.35rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-pretty text-[0.9rem] leading-relaxed text-fg-muted">
                      {item.body}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
