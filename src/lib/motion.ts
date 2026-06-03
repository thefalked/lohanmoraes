import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { prefersReducedMotion } from "./lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function isMotionEnabled(): boolean {
  return !prefersReducedMotion();
}
