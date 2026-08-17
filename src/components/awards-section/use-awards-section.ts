import { awards } from "../../data/portfolio";
import { useReveal } from "../../hooks/use-reveal";
import { awardsSectionContent } from "./awards-section.content";

export function useAwardsSection() {
  const sectionRef = useReveal<HTMLElement>();

  return {
    sectionRef,
    awards,
    content: awardsSectionContent,
  };
}
