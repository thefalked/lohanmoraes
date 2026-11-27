import { tv } from "tailwind-variants";

import type { ShowPackage } from "../../data/portfolio";
import { useBooking } from "../../providers/booking-provider";
import { showCardContent } from "./show-card.content";

const showCard = tv({
  slots: {
    root: [
      "flex w-full flex-col gap-4 p-6",
      "rounded-stage bg-surface-elevated/40 backdrop-blur-md",
      "ring-1 ring-border/50 transition-transform duration-300",
      "lg:w-[calc((100%-3rem)/3)] lg:shrink-0 lg:hover:-translate-y-1",
    ],
    badge: [
      "w-fit rounded-full bg-accent px-3 py-1 font-display text-body-sm",
      "font-semibold uppercase tracking-wide text-surface",
    ],
    title: "font-display text-display-md font-semibold uppercase text-text-bright",
    forWhom: "text-body-sm text-text",
    duration: "text-body-sm font-medium text-accent",
    list: "flex flex-col gap-2 border-t border-border/40 pt-4 text-body-sm text-text-muted",
    instruments: "flex flex-wrap gap-2",
    tag: ["rounded-full bg-accent-soft px-3 py-1", "text-body-sm text-text"],
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
          "ring-accent/45",
          "shadow-[0_0_0_1px_rgb(224_34_183/0.2),0_0_40px_rgb(224_34_183/0.12)]",
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
  const { openBooking } = useBooking();

  return (
    <article data-reveal className={styles.root()}>
      {featured && <span className={styles.badge()}>{showCardContent.featuredLabel}</span>}
      <h3 className={styles.title()}>{show.title}</h3>
      <p className={styles.forWhom()}>{show.forWhom}</p>
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
      <button
        type="button"
        className={styles.cta()}
        onClick={() => openBooking({ packageId: show.id })}
      >
        {showCardContent.ctaLabel}
      </button>
    </article>
  );
}
