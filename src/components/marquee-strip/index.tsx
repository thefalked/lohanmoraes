import { MarqueeStripView } from "./marquee-strip.view";
import { useMarqueeStrip } from "./use-marquee-strip";

export type MarqueeStripProps = {
  items: readonly string[];
};

export function MarqueeStrip({ items }: MarqueeStripProps) {
  const props = useMarqueeStrip();
  return <MarqueeStripView {...props} items={items} />;
}
