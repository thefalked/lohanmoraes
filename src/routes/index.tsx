import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "../components/about-section";
import { ContactSection } from "../components/contact-section";
import { HeroSection } from "../components/hero-section";
import { ShowsSection } from "../components/shows-section";
import { TeachingSection } from "../components/teaching-section";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ShowsSection />
      <TeachingSection />
      <ContactSection />
    </>
  );
}
