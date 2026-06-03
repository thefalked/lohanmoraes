import { teaching } from "../../data/portfolio";
import { useReveal } from "../../hooks/use-reveal";

export function useTeachingSection() {
  const sectionRef = useReveal<HTMLElement>();

  return {
    sectionRef,
    teaching,
    headingLines: ["Ensino", teaching.headline] as const,
    srHeading: "Aulas, produção musical e audiovisual",
  };
}
