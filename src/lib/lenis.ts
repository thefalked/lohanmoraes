import Lenis from "lenis";

export type LenisInstance = Lenis;

export function createLenis(): Lenis {
  return new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    orientation: "vertical",
    smoothWheel: true,
    touchMultiplier: 1.5,
  });
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
