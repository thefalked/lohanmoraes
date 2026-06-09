import { tv } from "tailwind-variants";

import { showQuoteUrl } from "../../data/portfolio";
import type { GuitarChapter } from "./guitar-chords.content";
import { guitarStoryContent } from "./guitar-chords.content";
import {
  chapterSectionLabel,
  GUITAR_CHAPTER_COUNT,
  scrollProgressPercent,
} from "./guitar-chords.logic";

const chapterCard = tv({
  slots: {
    card: [
      "w-full max-h-full overflow-y-auto stage-scrollbar",
      "rounded-stage border border-border/50 bg-surface/35 p-5 backdrop-blur-md",
      "shadow-[var(--shadow-stage-card)] lg:p-6 xl:p-8",
    ],
    cardBody: "flex flex-col gap-5 lg:gap-6",
    photoWrap:
      "relative aspect-4/3 w-full max-h-[34vh] shrink-0 overflow-hidden rounded-stage-sm lg:max-h-[38vh]",
    photo: "h-full w-full object-cover object-top",
    copy: "min-w-0",
    meta: "flex items-baseline justify-between gap-4 border-b border-border/60 pb-3 font-display text-[0.72rem] uppercase tracking-[0.22em]",
    section: "text-accent",
    step: "text-text-muted",
    progressTrack: "mt-4 h-0.5 bg-border/70",
    progressFill: "h-full bg-accent transition-[width] duration-500 ease-out",
    title:
      "mt-4 font-display text-[clamp(1.65rem,3.4vw,2.65rem)] font-semibold uppercase leading-[1.02] text-text-bright",
    subtitle: "mt-3 text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-text-muted",
    body: "mt-4 whitespace-pre-line text-body leading-relaxed text-text-muted/90",
    highlights: "mt-4 flex flex-col gap-2 border-l-2 border-accent/40 pl-4",
    highlightItem: "text-body leading-relaxed text-text-muted",
    chips: "mt-5 flex flex-wrap gap-2",
    chip: [
      "rounded-full border border-border/70 bg-accent-soft/80 px-4 py-2",
      "font-display text-[0.7rem] uppercase tracking-wide text-text",
    ],
    packageMeta: "mt-4 font-display text-body font-medium text-accent",
    list: "mt-4 flex flex-col gap-2 text-body text-text-muted",
    actions: "mt-6 flex flex-col gap-2.5 sm:flex-row",
    primary: [
      "inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3",
      "font-display text-[0.75rem] font-semibold uppercase tracking-wide text-surface",
      "transition-colors hover:bg-accent-muted",
    ],
    secondary: [
      "inline-flex items-center justify-center rounded-full border border-border px-6 py-3",
      "font-display text-[0.75rem] font-medium uppercase tracking-wide text-text-bright",
      "transition-colors hover:border-accent hover:text-accent",
    ],
  },
});

type ChapterCardProps = {
  chapter: GuitarChapter;
  chapterIndex: number;
};

export function ChapterCard({ chapter, chapterIndex }: ChapterCardProps) {
  const styles = chapterCard();
  const { showPackages, teaching, contact, whatsappUrl, contactWhatsAppLabel, quoteLabel } =
    guitarStoryContent;
  const showPackage =
    chapter.showPackageIndex !== undefined ? showPackages[chapter.showPackageIndex] : undefined;
  const photo = chapter.images[0];

  return (
    <article className={styles.card()} data-testid="story-chapter-card">
      <div className={styles.cardBody()}>
        {photo ? (
          <div className={styles.photoWrap()} aria-hidden="true">
            <img
              src={photo.src}
              alt=""
              className={styles.photo()}
              loading="lazy"
              draggable={false}
            />
          </div>
        ) : null}

        <div className={styles.copy()}>
          <div className={styles.meta()}>
            <span className={styles.section()}>{chapterSectionLabel(chapterIndex)}</span>
            <span className={styles.step()}>
              {String(chapterIndex + 1).padStart(2, "0")} /{" "}
              {String(GUITAR_CHAPTER_COUNT).padStart(2, "0")}
            </span>
          </div>

          <div className={styles.progressTrack()} aria-hidden="true">
            <div
              className={styles.progressFill()}
              style={{ width: `${scrollProgressPercent(chapterIndex)}%` }}
            />
          </div>

          <h2 className={styles.title()}>{chapter.title}</h2>
          {chapter.subtitle ? <p className={styles.subtitle()}>{chapter.subtitle}</p> : null}
          {chapter.body ? <p className={styles.body()}>{chapter.body}</p> : null}

          {chapter.kind === "show-package" && showPackage ? (
            <>
              <p className={styles.packageMeta()}>{showPackage.duration}</p>
              <ul className={styles.highlights()}>
                {showPackage.highlights.map((item) => (
                  <li key={item} className={styles.highlightItem()}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.actions()}>
                <a
                  href={showQuoteUrl(showPackage.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primary()}
                >
                  {quoteLabel}
                </a>
              </div>
            </>
          ) : null}

          {chapter.kind === "instruments" ? (
            <div className={styles.chips()}>
              {teaching.instruments.map((instrument) => (
                <span key={instrument} className={styles.chip()}>
                  {instrument}
                </span>
              ))}
            </div>
          ) : null}

          {chapter.kind === "production" ? (
            <ul className={styles.list()}>
              {teaching.production.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {chapter.kind === "contact" ? (
            <div className={styles.actions()}>
              <a
                href={whatsappUrl(contact.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primary()}
              >
                {contactWhatsAppLabel}
              </a>
              <a href={contact.phoneHref} className={styles.secondary()}>
                {contact.phone}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
