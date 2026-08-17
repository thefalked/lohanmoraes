import { AwardsSectionView } from "./awards-section.view";
import { useAwardsSection } from "./use-awards-section";

export function AwardsSection() {
  const awards = useAwardsSection();
  return <AwardsSectionView {...awards} />;
}
