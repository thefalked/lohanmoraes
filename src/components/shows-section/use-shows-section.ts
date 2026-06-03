import { showPackages } from "../../data/portfolio";
import { useReveal } from "../../hooks/use-reveal";
import { showsSectionContent } from "./shows-section.content";

export function useShowsSection() {
  const sectionRef = useReveal<HTMLElement>();

  return {
    sectionRef,
    shows: showPackages,
    content: showsSectionContent,
  };
}
