import SiteNav from "@/components/sections/SiteNav";
import Hero from "@/components/sections/Hero";
import Toolbelt from "@/components/sections/Toolbelt";
import Work from "@/components/sections/Work";
import Craft from "@/components/sections/Craft";
import Process from "@/components/sections/Process";
import Voices from "@/components/sections/Voices";
import Playground from "@/components/sections/Playground";
import Contact from "@/components/sections/Contact";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        {/* PAGE THEME LOCK: the hero is NOT a forced-dark block. It inherits
            whatever theme the page is in, so no section ever inverts. Depth
            comes from a tinted wash, not from flipping to dark mode. */}
        <Hero />
        <Toolbelt />
        <Work />
        <Craft />
        <Process />
        <Voices />
        <Playground />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
