import { useEffect, useRef, type RefObject } from "react";

import { gsap, isMotionEnabled } from "../lib/motion";

type RevealOptions = {
  y?: number;
  stagger?: number;
  start?: string;
};

export function useReveal<T extends HTMLElement>(options: RevealOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { y = 48, stagger = 0.12, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !isMotionEnabled()) {
      return;
    }

    const targets = el.querySelectorAll("[data-reveal]");
    const items = targets.length > 0 ? targets : [el];

    const ctx = gsap.context(() => {
      gsap.from(items, {
        y,
        opacity: 0,
        duration: 1,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, stagger, start]);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed = 0.15): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isMotionEnabled()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
