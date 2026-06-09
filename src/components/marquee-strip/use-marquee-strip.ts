import { useEffect, useRef } from "react";

import { gsap, isMotionEnabled } from "../../lib/motion";

export function useMarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isMotionEnabled()) {
      return;
    }

    const ctx = gsap.context(() => {
      // track holds two identical halves; sliding one half-width loops seamlessly
      gsap.to(track, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return { trackRef };
}
