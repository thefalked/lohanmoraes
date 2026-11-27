import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "../components/about-section";
import { AwardsSection } from "../components/awards-section";
import { ContactSection } from "../components/contact-section";
import { HeroSection } from "../components/hero-section";
import { MarqueeStrip } from "../components/marquee-strip";
import { ProofStrip } from "../components/proof-strip";
import { ShowsSection } from "../components/shows-section";
import { VideoSection } from "../components/video-section";
import { site } from "../data/portfolio";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const marqueeItems = ["Shows para eventos", "Casamentos", "Corporativo", "Festas", site.brand];

function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip items={marqueeItems} />
      <ProofStrip />
      <AboutSection />
      <VideoSection />
      <AwardsSection />
      <ShowsSection />
      <MarqueeStrip items={marqueeItems} />
      <ContactSection />
    </>
  );
}
