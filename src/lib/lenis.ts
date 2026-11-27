import Lenis from "lenis";

import { getPerfProfile } from "./performance";

export type LenisInstance = Lenis;

export function createLenis(): Lenis {
  const { lenis } = getPerfProfile();

  return new Lenis({
    duration: Math.min(lenis.duration, 1.05),
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: lenis.wheelMultiplier,
    touchMultiplier: lenis.touchMultiplier,
    syncTouch: false,
    syncTouchLerp: 0.1,
    touchInertiaExponent: 1.7,
    allowNestedScroll: true,
    autoRaf: false,
    prevent: (node) =>
      node.closest(
        "[data-slot='select-content'], [data-slot='dialog-content'], [data-slot='drawer-content']",
      ) != null,
  });
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
