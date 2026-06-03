import { TeachingSectionView } from "./teaching-section.view";
import { useTeachingSection } from "./use-teaching-section";

export function TeachingSection() {
  const teaching = useTeachingSection();
  return <TeachingSectionView {...teaching} />;
}
