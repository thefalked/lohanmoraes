import type { RefObject } from "react";
import { tv } from "tailwind-variants";

const marqueeStrip = tv({
  slots: {
    root: [
      "relative overflow-hidden border-y border-border bg-surface/60 py-4",
      "pointer-events-none select-none",
    ],
    track: "flex w-max items-center gap-8 whitespace-nowrap will-change-transform",
    item: [
      "flex items-center gap-8 font-display text-display-md font-bold uppercase",
      "tracking-tight text-text-bright/25",
    ],
    dot: "text-accent/60",
  },
});

export type MarqueeStripViewProps = {
  trackRef: RefObject<HTMLDivElement | null>;
  items: readonly string[];
};

export function MarqueeStripView({ trackRef, items }: MarqueeStripViewProps) {
  const styles = marqueeStrip();
  const halves = [0, 1];

  return (
    <div className={styles.root()} aria-hidden="true">
      <div ref={trackRef} className={styles.track()}>
        {halves.map((half) => (
          <div key={half} className={styles.item()}>
            {items.map((item) => (
              <span key={`${half}-${item}`} className="flex items-center gap-8">
                {item}
                <span className={styles.dot()}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
