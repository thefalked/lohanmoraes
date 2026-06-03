import { SiteHeaderView } from "./site-header.view";
import { useSiteHeader } from "./use-site-header";

export function SiteHeader() {
  const header = useSiteHeader();
  return <SiteHeaderView {...header} />;
}
