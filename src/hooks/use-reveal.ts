import { useEffect, useRef, type RefObject } from "react";

import { getPerfProfile } from "../lib/performance";
import { gsap, isMotionEnabled } from "../lib/motion";

type RevealOptions = {
  y?: number;
  stagger?: number;
  start?: string;
  duration?: number;
};

export function useReveal<T extends HTMLElement>(options: RevealOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null);
  const profile = getPerfProfile();
  const {
    y = profile.reveal.y,
    stagger = profile.reveal.stagger,
    duration = profile.reveal.duration,
    start = "top 90%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !isMotionEnabled()) {
      return;
    }

    const targets = el.querySelectorAll("[data-reveal]");
    const items = targets.length > 0 ? Array.from(targets) : [el];

    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        gsap.set(item, {
          autoAlpha: 0,
          y,
          // Avoid fighting CSS transition-transform on cards during the tween.
          transition: "none",
        });

        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration,
          delay: Math.min(index * stagger, 0.35),
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: item,
            start,
            once: true,
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
          onComplete: () => {
            // Hand transform back to CSS (hover lifts, etc.).
            gsap.set(item, { clearProps: "transform,transition" });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [y, stagger, start, duration]);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed = 0.12): RefObject<T | null> {
  const ref = useRef<T>(null);
  const profile = getPerfProfile();
  const scaledSpeed = profile.tier === "low" ? speed * 0.5 : speed;

  useEffect(() => {
    const el = ref.current;
    if (!el || !isMotionEnabled()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -scaledSpeed * 40 },
        {
          yPercent: scaledSpeed * 40,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [scaledSpeed]);

  return ref;
}
