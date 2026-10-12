import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Grain from "@/components/primitives/Grain";

/* Self-hosted through next/font: no render-blocking <link> to Google Fonts. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-bricolage",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: `${site.name} - ${site.role}`,
  description:
    "Frontend and UI engineer working on design systems, interaction motion, and performance for product teams.",
  openGraph: {
    title: `${site.name} - ${site.role}`,
    description:
      "Design systems, interaction motion, and performance work for product teams.",
    type: "website",
  },
};

/* Runs before paint so the theme never flashes the wrong mode. */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-accent-fg"
        >
          Skip to content
        </a>
        {children}
        <Grain />
      </body>
    </html>
  );
}
