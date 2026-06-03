import { contact } from "../../data/portfolio";
import { useReveal } from "../../hooks/use-reveal";
import { contactSectionBrand, contactSectionContent } from "./contact-section.content";

export function useContactSection() {
  const sectionRef = useReveal<HTMLElement>();

  return {
    sectionRef,
    contact,
    content: contactSectionContent,
    brand: contactSectionBrand,
  };
}
