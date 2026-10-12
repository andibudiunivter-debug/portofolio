"use client";

import { useEffect, useRef } from "react";
import { process as content } from "@/content/site";
import SplitHeading from "@/components/primitives/SplitHeading";

/**
 * GSAP ScrollTrigger, used properly: the section pins, the headline holds, and
 * the four steps scrub in against the scroll with a progress rail. Timeline is
 * scrubbed rather than triggered, so the stage always matches scroll position.
 *
 * Under prefers-reduced-motion the pin is never created and every step is
 * rendered in its final state: no pin, no scrub, no lost content.
 */
export default function Process() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = Array.from(node.querySelectorAll<HTMLElement>("[data-step]"));

    if (reduced) {
      steps.forEach((step) => {
        step.style.opacity = "1";
        step.style.transform = "none";
      });
      if (rail.current) rail.current.style.transform = "scaleY(1)";
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // Lazy-load GSAP so it stays out of the initial bundle.
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: node,
              start: "top top",
              end: "+=" + steps.length * 420,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline.fromTo(
            steps,
            { opacity: 0.18, y: 34 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.85, ease: "power2.out" },
          );

          /* Rail fills in lockstep with the step stagger.
             NOTE: the rail must NOT carry an inline transform in JSX. GSAP parses
             an existing inline `transform` and animates the composed property
             (e.g. `scale`), which silently overrides `scaleY`. Set the zero state
             here instead, and size the tween in px so its length is deterministic. */
          if (rail.current) {
            const railLen = rail.current.parentElement?.offsetHeight ?? 0;
            timeline.fromTo(
              rail.current,
              { scaleY: 0 },
              { scaleY: 1, duration: 1, ease: "none" },
              0,
            );
            if (railLen) {
              gsap.set(rail.current, { height: railLen, transformOrigin: "top center" });
            }
          }

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        });

        // Small screens: no pin, just reveal each step normally.
        mm.add("(max-width: 767px)", () => {
          const tween = gsap.fromTo(
            steps,
            { opacity: 0.2, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.18,
              ease: "power2.out",
              scrollTrigger: { trigger: node, start: "top 72%", once: true },
            },
          );
          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        });

        cleanup = () => mm.revert();
      },
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section id="process" className="scroll-mt-24 border-t border-line py-24 md:py-0">
      <div ref={root} className="relative md:flex md:min-h-[100dvh] md:items-center md:py-24">
        <div className="shell w-full">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SplitHeading
                lines={[content.headline]}
                sizeClasses="text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02]"
              />
              <p className="mt-6 max-w-[38ch] text-pretty text-[0.95rem] leading-relaxed text-fg-muted">
                {content.sub}
              </p>
            </div>

            <div className="relative lg:col-span-7">
              {/* Progress rail. No inline transform here: see the note in the
                  effect. The track is h-full, the fill is scaled by GSAP. */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-1 hidden h-full w-px bg-line md:block"
              >
                <div ref={rail} className="h-full w-px origin-top bg-accent" />
              </div>

              <ol className="flex flex-col gap-10 md:gap-14 md:pl-8">
                {content.steps.map((step, index) => (
                  <li
                    key={step.title}
                    data-step
                    className="border-b border-line pb-10 last:border-0 last:pb-0 md:pb-14"
                  >
                    <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-fg md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-pretty text-[0.92rem] leading-relaxed text-fg-muted">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
