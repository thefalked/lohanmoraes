import { HeroSectionView } from "./hero-section.view";
import { useHeroSection } from "./use-hero-section";

export function HeroSection() {
  const hero = useHeroSection();
  return <HeroSectionView {...hero} />;
}
