import type { RefObject } from "react";
import { tv } from "tailwind-variants";

const marqueeStrip = tv({
  slots: {
    root: [
      "relative overflow-hidden border-y border-border bg-surface/60 py-4",
      "pointer-events-none select-none",
    ],
    track: "flex w-max items-center whitespace-nowrap will-change-transform",
    seq: "flex items-center",
    item: [
      "flex items-center gap-8 pr-8 font-display text-display-md font-bold uppercase",
      "tracking-tight text-text-bright/25",
    ],
    dot: "text-accent/60",
  },
});

export type MarqueeStripViewProps = {
  rootRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  seqRef: RefObject<HTMLDivElement | null>;
  copies: number;
  items: readonly string[];
};

export function MarqueeStripView({
  rootRef,
  trackRef,
  seqRef,
  copies,
  items,
}: MarqueeStripViewProps) {
  const styles = marqueeStrip();

  return (
    <div ref={rootRef} className={styles.root()} aria-hidden="true">
      <div ref={trackRef} className={styles.track()}>
        {Array.from({ length: copies }).map((_, copy) => (
          <div key={copy} ref={copy === 0 ? seqRef : undefined} className={styles.seq()}>
            {items.map((item) => (
              <span key={`${copy}-${item}`} className={styles.item()}>
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
