import { tv } from "tailwind-variants";

import type { useProofStrip } from "./use-proof-strip";

const proofStrip = tv({
  slots: {
    root: "relative border-y border-border bg-surface/40 px-5 py-8 lg:px-10",
    inner:
      "mx-auto flex max-w-content flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
    list: "flex flex-wrap gap-3",
    chip: [
      "rounded-full border border-border bg-accent-soft px-4 py-2",
      "font-display text-body-sm uppercase tracking-wide text-text-bright",
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
