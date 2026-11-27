import { tv } from "tailwind-variants";

import type { useProofStrip } from "./use-proof-strip";

const proofStrip = tv({
  slots: {
    root: "relative section-wash border-y border-border/50 px-5 py-10 lg:px-10",
    inner: "mx-auto flex max-w-content flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
    list: "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3",
    chip: [
      "font-display text-body-sm uppercase tracking-[0.18em] text-text-bright",
      "border-l-2 border-accent pl-3",
    ],
    link: [
      "font-display text-body-sm font-medium uppercase tracking-widest text-accent",
      "transition-colors hover:text-accent-muted",
    ],
  },
});

export type ProofStripViewProps = ReturnType<typeof useProofStrip>;

export function ProofStripView({ credits, content }: ProofStripViewProps) {
  const styles = proofStrip();

  return (
    <section className={styles.root()} aria-label={content.ariaLabel}>
      <div className={styles.inner()}>
        <ul className={styles.list()}>
          {credits.map((credit) => (
            <li key={credit.id} className={styles.chip()}>
              {credit.label}
            </li>
          ))}
        </ul>
        <a href={content.awardsHref} className={styles.link()}>
          {content.awardsLinkLabel}
        </a>
      </div>
    </section>
  );
}
