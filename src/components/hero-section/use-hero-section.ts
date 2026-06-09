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
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.25,
      });

      gsap.from("[data-hero-portrait]", {
        scale: 0.88,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.5,
      });

      // hero content drifts up and fades as the 3D stage takes over
      gsap.to("[data-hero-fade]", {
        yPercent: -12,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom 35%",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    roles: site.roles,
    name: site.name,
    tagline: heroSectionContent.tagline,
    content: heroSectionContent,
  };
}
