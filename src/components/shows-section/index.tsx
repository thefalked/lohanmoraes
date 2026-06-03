import { ShowsSectionView } from "./shows-section.view";
import { useShowsSection } from "./use-shows-section";

export function ShowsSection() {
  const shows = useShowsSection();
  return <ShowsSectionView {...shows} />;
}
