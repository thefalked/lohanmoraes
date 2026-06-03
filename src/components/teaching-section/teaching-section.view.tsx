import { tv } from "tailwind-variants";

import { SplitHeading } from "../split-heading";
import type { useTeachingSection } from "./use-teaching-section";

const teachingSection = tv({
  slots: {
    root: "scroll-mt-20 px-5 py-24 lg:px-10 lg:py-32",
    inner: "mx-auto max-w-content",
    sub: "mt-4 max-w-2xl text-body-lg text-text-muted",
    lessonsLabel: [
      "mt-10 font-display text-body-sm font-medium uppercase tracking-[0.2em]",
      "text-accent",
    ],
    chips: "mt-4 flex flex-wrap gap-3",
    chip: [
      "rounded-full border border-border px-5 py-2.5",
      "font-display text-body-sm font-medium uppercase tracking-wide text-text-bright",
      "transition-colors hover:border-accent hover:bg-accent-soft",
    ],
    productionBlock: "mt-16 border-t border-border pt-12",
    productionTitle: ["font-display text-display-md font-semibold uppercase text-text-bright"],
    productionList: "mt-6 flex flex-col gap-4",
    productionItem: "text-body-lg text-text-muted",
  },
});

export type TeachingSectionViewProps = ReturnType<typeof useTeachingSection>;

export function TeachingSectionView({
  sectionRef,
  teaching,
  headingLines,
  srHeading,
}: TeachingSectionViewProps) {
  const styles = teachingSection();

  return (
    <section
      id="ensino"
      ref={sectionRef}
      className={styles.root()}
      aria-labelledby="ensino-heading"
    >
      <div className={styles.inner()}>
        <SplitHeading lines={[...headingLines]} accentIndex={0} />
        <h2 id="ensino-heading" className="sr-only">
          {srHeading}
        </h2>
        <p data-reveal className={styles.sub()}>
          {teaching.description}
        </p>
        <p data-reveal className={styles.lessonsLabel()}>
          {teaching.lessonsLabel}
        </p>
        <div className={styles.chips()}>
          {teaching.instruments.map((instrument) => (
            <span key={instrument} data-reveal className={styles.chip()}>
              {instrument}
            </span>
          ))}
        </div>
        <div data-reveal className={styles.productionBlock()}>
          <h3 className={styles.productionTitle()}>{teaching.production.headline}</h3>
          <ul className={styles.productionList()}>
            {teaching.production.items.map((item) => (
              <li key={item} className={styles.productionItem()}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
