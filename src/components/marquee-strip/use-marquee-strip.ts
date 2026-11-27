import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { gsap, isMotionEnabled } from "../../lib/motion";

const SPEED = 60; // px per second

export function useMarqueeStrip(items: readonly string[]) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const seq = seqRef.current;
    if (!root || !seq) {
      return;
    }

    const measure = () => {
      const ratio = root.offsetWidth / seq.offsetWidth;
      setCopies(Math.max(2, Math.ceil(ratio) + 1));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);

    return () => ro.disconnect();
  }, [items]);

  useEffect(() => {
    const track = trackRef.current;
    const seq = seqRef.current;
    const root = rootRef.current;
    if (!track || !seq || !root || !isMotionEnabled()) {
      return;
    }

    const seqWidth = seq.offsetWidth;
    gsap.set(track, { x: 0, force3D: true });
    const tween = gsap.to(track, {
      x: -seqWidth,
      duration: seqWidth / SPEED,
      ease: "none",
      repeat: -1,
      modifiers: { x: (x) => `${parseFloat(x) % seqWidth}px` },
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        if (entry.isIntersecting) {
          tween.resume();
        } else {
          tween.pause();
        }
      },
      { rootMargin: "12% 0px", threshold: 0 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      tween.kill();
    };
  }, [copies]);

  return { rootRef, trackRef, seqRef, copies };
}
