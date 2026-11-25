import { tv } from "tailwind-variants";

import { ShowCard } from "../show-card";
import { SplitHeading } from "../split-heading";
import type { useShowsSection } from "./use-shows-section";

const showsSection = tv({
  slots: {
    root: [
      "relative scroll-mt-20 border-t border-border bg-surface/35",
      "px-5 py-24 lg:px-10 lg:py-32",
    ],
    inner: "mx-auto max-w-content",
    intro: "mb-12 max-w-2xl",
    sub: "mt-4 text-body-lg text-text",
    track: "flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:justify-center",
    stickyLabel: [
      "pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2",
      "font-display text-[clamp(4rem,12vw,10rem)] font-bold uppercase leading-none",
      "text-accent/10 lg:block",
    ],
  },
});

export type ShowsSectionViewProps = ReturnType<typeof useShowsSection>;

export function ShowsSectionView({ sectionRef, shows, content }: ShowsSectionViewProps) {
  const styles = showsSection();

  return (
    <section id="shows" ref={sectionRef} className={styles.root()} aria-labelledby="shows-heading">
      <span className={styles.stickyLabel()} aria-hidden="true">
        {content.stickyLabel}
      </span>
      <div className={styles.inner()}>
        <div className={styles.intro()}>
          <SplitHeading lines={[...content.headingLines]} accentIndex={0} />
          <h2 id="shows-heading" className="sr-only">
            {content.srHeading}
          </h2>
          <p data-reveal className={styles.sub()}>
            {content.intro}
          </p>
        </div>
        <div className={styles.track()}>
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} featured={show.id === content.featuredId} />
          ))}
        </div>
      </div>
    </section>
  );
}
