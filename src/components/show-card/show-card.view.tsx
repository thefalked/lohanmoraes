import { tv } from "tailwind-variants";

import type { ShowPackage } from "../../data/portfolio";
import { showQuoteUrl } from "../../data/portfolio";
import { showCardContent } from "./show-card.content";

const showCard = tv({
  slots: {
    root: [
      "flex min-w-[min(100%,20rem)] snap-start flex-col gap-4",
      "rounded-stage border border-border bg-surface-elevated/75 p-6 backdrop-blur-md",
      "shadow-stage-card transition-transform duration-300 lg:min-w-[18rem]",
      "lg:hover:-translate-y-1.5",
    ],
    badge: [
      "w-fit rounded-full bg-accent px-3 py-1 font-display text-body-sm",
      "font-semibold uppercase tracking-wide text-surface",
    ],
    title: "font-display text-display-md font-semibold uppercase text-text-bright",
    duration: "text-body-sm font-medium text-accent",
    list: "flex flex-col gap-2 text-body-sm text-text-muted",
    instruments: "flex flex-wrap gap-2",
    tag: ["rounded-full border border-border bg-accent-soft px-3 py-1", "text-body-sm text-text"],
    cta: [
      "mt-auto inline-flex items-center justify-center rounded-stage-sm",
      "bg-accent px-5 py-3 font-display text-body-sm font-medium uppercase tracking-wide",
      "text-surface transition-colors duration-200",
      "hover:bg-accent-muted",
    ],
  },
  variants: {
    featured: {
      true: {
        root: [
          "border-accent/40",
          "shadow-[0_0_0_1px_rgb(224_34_183/0.3),0_0_48px_rgb(224_34_183/0.18)]",
        ],
      },
    },
  },
});

export type ShowCardViewProps = {
  show: ShowPackage;
  featured?: boolean;
};

export function ShowCardView({ show, featured = false }: ShowCardViewProps) {
  const styles = showCard({ featured });

  return (
    <article data-reveal className={styles.root()}>
      {featured && <span className={styles.badge()}>{showCardContent.featuredLabel}</span>}
      <h3 className={styles.title()}>{show.title}</h3>
      <p className={styles.duration()}>{show.duration}</p>
      <ul className={styles.list()}>
        {show.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className={styles.instruments()}>
        {show.instruments.map((instrument) => (
          <span key={instrument} className={styles.tag()}>
            {instrument}
          </span>
        ))}
      </div>
      <a
        href={showQuoteUrl(show.title)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta()}
      >
        {showCardContent.ctaLabel}
      </a>
    </article>
  );
}
