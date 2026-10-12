import Link from "next/link";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { footer, nav, site } from "@/content/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-14 md:py-16">
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[34ch]">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-[var(--radius-small)] bg-fg text-[0.7rem] font-bold tracking-tight text-bg"
              >
                {site.monogram}
              </span>
              <span className="font-display text-[0.95rem] font-semibold tracking-[-0.02em] text-fg">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-pretty text-[0.85rem] leading-relaxed text-fg-muted">
              {footer.line}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-block py-1.5 text-[0.88rem] font-medium text-fg-muted transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="inline-block py-1.5 text-[0.88rem] font-medium text-fg-muted transition-colors hover:text-accent"
            >
              Email
            </a>
          </nav>

          <a
            href="#top"
            className="group inline-flex items-center gap-2.5 self-start rounded-full border border-line-strong bg-bg-soft px-4 py-2.5 text-[0.8rem] font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Back to top
            <ArrowUp
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.68rem] tracking-[0.06em] text-fg-faint">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          {/* No locale strip here. City and timezone belong in the contact
              block where they do real scheduling work, not as footer mood. */}
          <a
            href={`mailto:${site.email}`}
            className="inline-block py-1 font-mono text-[0.68rem] tracking-[0.06em] text-fg-muted transition-colors hover:text-accent"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
