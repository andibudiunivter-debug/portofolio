"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, WarningCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import { contact, site } from "@/content/site";
import SplitHeading from "@/components/primitives/SplitHeading";
import Button from "@/components/primitives/Button";
import Magnetic from "@/components/primitives/Magnetic";
import { EASE_OUT } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";

/* Shared input chrome. Pills are for controls, so inputs take the small radius. */
const field =
  "w-full rounded-[var(--radius-small)] border border-line bg-surface px-4 py-3 text-[0.95rem] text-fg placeholder:text-fg-faint transition-colors duration-200 focus:border-accent focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const data = new FormData(event.currentTarget);
    setName(String(data.get("name") ?? ""));

    try {
      // Static build: no server route to post to. Wire this to your own
      // endpoint (Formspree, Resend, a Worker) and keep the same three states.
      await new Promise((resolve) => setTimeout(resolve, 700));
      const shouldFail = data.get("simulateError") === "on";
      if (shouldFail) throw new Error("simulated failure");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line bg-bg-soft py-24 md:py-36">
      <div className="shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 lg:pr-10">
            <SplitHeading
              lines={[contact.headline]}
              sizeClasses="text-[clamp(2rem,4.8vw,3.6rem)] leading-[1.02]"
            />
            <p className="mt-6 max-w-[44ch] text-pretty text-[0.98rem] leading-relaxed text-fg-muted">
              {contact.sub}
            </p>

            <div className="mt-10 space-y-4 border-t border-line pt-8">
              <div className="flex flex-wrap items-baseline gap-x-4">
                <span className="w-20 shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-faint">
                  Email
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="font-display text-lg font-semibold tracking-[-0.02em] text-fg underline-offset-[6px] transition-colors hover:text-accent hover:underline"
                >
                  {site.email}
                </a>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-4">
                <span className="w-20 shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-faint">
                  Timezone
                </span>
                <span className="text-[0.95rem] text-fg-muted">{site.locationNote}</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-4">
                <span className="w-20 shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-faint">
                  Elsewhere
                </span>
                <ul className="flex flex-wrap gap-x-5 gap-y-1">
                  {site.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-block py-1 text-[0.95rem] font-medium text-fg-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: EASE_OUT }}
              className="rounded-[var(--radius-card)] border border-line bg-bg p-6 md:p-8"
            >
              {status === "success" ? (
                /* Replaces the form entirely, so there is no ambiguity. */
                <div className="flex min-h-[22rem] flex-col items-start justify-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
                    <CheckCircle size={24} weight="fill" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.03em] text-fg">
                    Thanks{name ? `, ${name.split(" ")[0]}` : ""} - message sent.
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-pretty text-[0.95rem] leading-relaxed text-fg-muted">
                    I reply within two working days, usually sooner. If it is urgent, email me
                    directly at {site.email}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-muted"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className={field}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-muted"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={field}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="brief"
                      className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-muted"
                    >
                      Project
                    </label>
                    <textarea
                      id="brief"
                      name="brief"
                      required
                      rows={5}
                      placeholder="What are you building, and what is the deadline?"
                      className={`${field} resize-y`}
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[0.82rem] text-fg-muted">
                    <input
                      type="checkbox"
                      name="simulateError"
                      className="h-5 w-5 shrink-0 rounded-[4px] border-line accent-[var(--accent)]"
                    />
                    Simulate a send failure (to preview the error state)
                  </label>

                  {/* Error state is inline and adjacent to the action, never a toast. */}
                  {status === "error" ? (
                    <p
                      role="alert"
                      className="flex items-start gap-2.5 rounded-[var(--radius-small)] border border-line bg-accent-soft px-4 py-3 text-[0.85rem] leading-relaxed text-fg"
                    >
                      <WarningCircle
                        size={17}
                        weight="fill"
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>
                        That did not go through. Your text is still here - try again, or email{" "}
                        {site.email}.
                      </span>
                    </p>
                  ) : null}

                  <div className="mt-1 flex flex-wrap items-center gap-4">
                    <Magnetic strength={0.18}>
                      <Button
                        type="submit"
                        disabled={status === "submitting"}
                        className="min-w-[10rem]"
                      >
                        {status === "submitting" ? (
                          <span className="inline-flex items-center gap-2.5">
                            <span
                              aria-hidden="true"
                              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
                            />
                            Sending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2.5">
                            <PaperPlaneTilt size={16} weight="fill" aria-hidden="true" />
                            {contact.cta}
                          </span>
                        )}
                      </Button>
                    </Magnetic>
                    <p className="max-w-[34ch] text-[0.72rem] leading-snug text-fg-faint">
                      {contact.formNote}
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
