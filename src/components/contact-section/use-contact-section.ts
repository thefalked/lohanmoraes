import { contact } from "../../data/portfolio";
import { useReveal } from "../../hooks/use-reveal";
import { useBooking } from "../../providers/booking-provider";
import { contactSectionBrand, contactSectionContent } from "./contact-section.content";

export function useContactSection() {
  const sectionRef = useReveal<HTMLElement>();
  const { openBooking } = useBooking();

  return {
    sectionRef,
    contact,
    content: contactSectionContent,
    brand: contactSectionBrand,
    onHireClick: () => openBooking(),
  };
}
