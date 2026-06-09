import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "../components/about-section";
import { ContactSection } from "../components/contact-section";
import { HeroSection } from "../components/hero-section";
import { MarqueeStrip } from "../components/marquee-strip";
import { ShowsSection } from "../components/shows-section";
import { TeachingSection } from "../components/teaching-section";
import { site } from "../data/portfolio";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const marqueeItems = ["Shows ao vivo", "Aulas de instrumentos", "Produção musical", site.brand];

function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip items={marqueeItems} />
      <AboutSection />
      <ShowsSection />
      <TeachingSection />
      <MarqueeStrip items={marqueeItems} />
      <ContactSection />
    </>
  );
}
