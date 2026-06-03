import { bio } from "../../data/portfolio";
import { useParallax, useReveal } from "../../hooks/use-reveal";

export function useAboutSection() {
  const sectionRef = useReveal<HTMLElement>();
  const parallaxRef = useParallax<HTMLImageElement>(0.08);

  return {
    sectionRef,
    parallaxRef,
    bio,
    headingLines: ["Sobre", bio.headline] as const,
    srHeading: "Sobre Lohan Moraes",
  };
}
