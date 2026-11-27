import type { RefObject } from "react";
import { tv } from "tailwind-variants";

const marqueeStrip = tv({
  slots: {
    root: [
      "relative overflow-hidden border-y border-border/60 py-5",
      "bg-linear-to-r from-accent/5 via-transparent to-accent-secondary/5",
      "pointer-events-none select-none",
      "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-16",
      "before:bg-linear-to-r before:from-surface before:to-transparent",
      "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-16",
      "after:bg-linear-to-l after:from-surface after:to-transparent",
    ],
    track: "flex w-max items-center whitespace-nowrap will-change-transform",
    seq: "flex items-center",
    item: [
      "flex items-center gap-8 pr-8 font-display text-display-md font-bold uppercase",
      "tracking-tight text-text-bright/20",
    ],
    dot: "text-accent/50",
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
                <span className={styles.dot()}>/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
