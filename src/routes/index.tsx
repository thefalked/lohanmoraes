import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "../components/about-section";
import { ContactSection } from "../components/contact-section";
import { GuitarChordsExperience } from "../components/guitar-chords";
import { HeroSection } from "../components/hero-section";
import { ShowsSection } from "../components/shows-section";
import { TeachingSection } from "../components/teaching-section";
import { isMotionEnabled } from "../lib/motion";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function ClassicHomePage() {
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

function HomePage() {
  if (isMotionEnabled()) {
    return <GuitarChordsExperience />;
  }
  return <ClassicHomePage />;
}
