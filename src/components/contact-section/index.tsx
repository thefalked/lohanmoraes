import { ContactSectionView } from "./contact-section.view";
import { useContactSection } from "./use-contact-section";

export function ContactSection() {
  const contact = useContactSection();
  return <ContactSectionView {...contact} />;
}
