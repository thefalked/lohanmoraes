import { AboutSectionView } from "./about-section.view";
import { useAboutSection } from "./use-about-section";

export function AboutSection() {
  const about = useAboutSection();
  return <AboutSectionView {...about} />;
}
