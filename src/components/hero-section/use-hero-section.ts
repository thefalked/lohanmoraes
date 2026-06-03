import { useEffect, useRef } from "react";

import { site } from "../../data/portfolio";
import { gsap, isMotionEnabled } from "../../lib/motion";
import { heroSectionContent } from "./hero-section.content";

export function useHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isMotionEnabled()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-reveal]", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    roles: site.roles,
    name: site.name,
    tagline: heroSectionContent.taglineSuffix(site.brand),
    content: heroSectionContent,
  };
}
