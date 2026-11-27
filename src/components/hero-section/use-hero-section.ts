import { useEffect, useRef } from "react";

import { site } from "../../data/portfolio";
import { gsap, isMotionEnabled, ScrollTrigger } from "../../lib/motion";
import { useBooking } from "../../providers/booking-provider";
import { heroSectionContent } from "./hero-section.content";

export function useHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isMotionEnabled()) {
      return;
    }

    const ctx = gsap.context(() => {
      const revealItems = section.querySelectorAll("[data-hero-reveal]");
      const fadeTarget = section.querySelector("[data-hero-fade]");

      gsap.set(revealItems, { opacity: 0, y: 56, force3D: true });
      gsap.to(revealItems, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
        force3D: true,
      });

      if (fadeTarget) {
        gsap.fromTo(
          fadeTarget,
          { yPercent: 0, opacity: 1 },
          {
            yPercent: -12,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom 40%",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    roles: site.roles,
    name: site.name,
    tagline: heroSectionContent.tagline,
    content: heroSectionContent,
    onHireClick: () => openBooking(),
  };
}
