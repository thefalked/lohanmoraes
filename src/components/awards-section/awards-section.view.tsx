import { tv } from "tailwind-variants";

import { SplitHeading } from "../split-heading";
import type { useAwardsSection } from "./use-awards-section";

const awardsSection = tv({
  slots: {
    root: "relative scroll-mt-20 border-t border-border bg-surface/35 px-5 py-24 lg:px-10 lg:py-32",
    inner: "mx-auto max-w-content",
    intro: "mb-12 max-w-2xl",
    list: "flex flex-col gap-10",
    card: "stage-panel grid gap-8 p-7 lg:grid-cols-2 lg:gap-12 lg:p-10",
    body: "flex flex-col gap-5",
    place: [
      "font-display text-body-sm font-medium uppercase tracking-[0.2em]",
      "text-accent stage-glow",
    ],
    title: "font-display text-display-md font-semibold uppercase leading-tight text-text-bright",
    meta: "flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm uppercase tracking-wide text-text",
    metaDot: "text-accent",
    description: "text-body-lg text-text",
    figure: "shimmer overflow-hidden rounded-stage border border-border shadow-stage-card",
    img: "h-full w-full object-cover",
  },
});

export type AwardsSectionViewProps = ReturnType<typeof useAwardsSection>;

export function AwardsSectionView({ sectionRef, awards, content }: AwardsSectionViewProps) {
  const styles = awardsSection();

  return (
    <section
      id="premios"
      ref={sectionRef}
      className={styles.root()}
      aria-labelledby="premios-heading"
    >
      <div className={styles.inner()}>
        <div className={styles.intro()}>
          <SplitHeading lines={[...content.headingLines]} accentIndex={0} />
          <h2 id="premios-heading" className="sr-only">
            {content.srHeading}
          </h2>
        </div>
        <div className={styles.list()}>
          {awards.map((award) => (
            <article key={award.id} data-reveal className={styles.card()}>
              <div className={styles.body()}>
                <p className={styles.place()}>
                  {award.place} · {award.category}
                </p>
                <h3 className={styles.title()}>{award.event}</h3>
                <p className={styles.meta()}>
                  <span>{award.location}</span>
                  <span className={styles.metaDot()} aria-hidden="true">
                    ·
                  </span>
                  <span>{award.year}</span>
                </p>
                <p className={styles.description()}>{award.description}</p>
              </div>
              <div className={styles.figure()}>
                <img
                  src={award.photo.src}
                  alt={award.photo.alt}
                  className={styles.img()}
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
