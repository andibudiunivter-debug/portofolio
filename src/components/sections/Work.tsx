"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects, workIntro, type Project } from "@/content/site";
import SplitHeading from "@/components/primitives/SplitHeading";
import Magnetic from "@/components/primitives/Magnetic";
import { EASE_OUT } from "@/lib/motion";

function Card({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slight scale drift gives the two columns depth without moving layout.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduced ? [1, 1, 1] : index % 2 === 0 ? [0.96, 1, 0.96] : [0.985, 1, 0.985],
  );
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className={`group ${index % 2 === 1 ? "lg:mt-28" : ""}`}
    >
      <a href={`#${project.slug}`} className="block focus-visible:outline-none">
        <motion.div
          style={{ scale }}
          className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2"
        >
          <div className="aspect-[4/3] overflow-hidden lg:aspect-[3/2]">
            <motion.img
              src={project.image.src}
              alt={project.image.alt}
              width={1400}
              height={900}
              loading="lazy"
              style={{ y: imageY }}
              className="h-[116%] w-full -translate-y-[8%] object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          </div>

          {/* Depth only, and only over the bottom two-fifths. A full-cover
              scrim darkens the top of the photograph for no reason and makes
              every project image read as the same muddy tile. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/45 to-transparent"
          />

          <span className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </span>
        </motion.div>

        {/* Meta sits below the image, never on top of it. */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-display text-sm font-semibold tracking-[-0.01em] text-accent">
            {project.kind}
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          <span className="font-mono text-[0.7rem] tracking-[0.1em] text-fg-muted">
            {project.year}
          </span>
        </div>

        <h3 className="mt-3 font-display text-[1.7rem] font-semibold tracking-[-0.03em] transition-colors duration-200 group-hover:text-accent md:text-[2rem]">
          {project.name}
        </h3>

        <p className="mt-3 max-w-[56ch] text-pretty text-[0.95rem] leading-relaxed text-fg-muted">
          {project.summary}
        </p>

        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-[0.6rem] uppercase leading-tight tracking-[0.12em] text-fg-faint">
                {fact.label}
              </dt>
              <dd className="mt-1.5 font-display text-lg font-semibold tracking-[-0.02em] text-fg">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-[0.68rem] tracking-[0.02em] text-fg-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </a>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-36">
      <div className="shell">
        {/* SPLIT-HEADER BAN: the earlier version put the headline left and a
            filler explainer paragraph right. That is the banned pattern. The
            section has one message, so headline and body stack vertically. */}
        <div className="max-w-[62ch] border-b border-line pb-10">
          <SplitHeading
            lines={[workIntro.headline]}
            sizeClasses="text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.02]"
          />
          <p className="mt-6 text-pretty text-[0.98rem] leading-relaxed text-fg-muted">
            {workIntro.sub}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-20 md:gap-y-24 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-line-strong bg-bg-soft px-7 py-4 text-sm font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Ask for the full case studies
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
