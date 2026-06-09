import { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";

import type { GuitarChapter } from "./guitar-chords.content";
import { chapterPanelSide } from "./guitar-chords.logic";
import { ChapterCard } from "./story-chapter-card";

const storySection = tv({
  slots: {
    section: "relative min-h-[var(--chapter-scroll-vh)]",
    cardSlot: [
      "sticky top-18 z-20 box-border flex min-h-[calc(100svh-4.5rem)] items-start",
      "pointer-events-none pb-[5.75rem]",
    ],
    cardLeft: [
      "pointer-events-auto w-full px-4 sm:px-6",
      "lg:w-[min(44vw,34rem)] lg:px-8 xl:px-10",
    ],
    cardRight: [
      "pointer-events-auto ml-auto w-full px-4 sm:px-6",
      "lg:w-[min(44vw,34rem)] lg:px-8 xl:px-10",
    ],
    cardMotion: "transition-[opacity,transform,filter] duration-700 ease-out",
    cardIdle: "opacity-0 blur-[5px]",
    cardFromLeft: "-translate-x-9 translate-y-7 scale-[0.965]",
    cardFromRight: "translate-x-9 translate-y-7 scale-[0.965]",
    cardShown: "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0",
  },
});

type StoryChapterSectionProps = {
  chapter: GuitarChapter;
  chapterIndex: number;
  anchorId?: string;
};

export function StoryChapterSection({ chapter, chapterIndex, anchorId }: StoryChapterSectionProps) {
  const styles = storySection();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(chapterIndex === 0);
  const onLeft = chapterPanelSide(chapterIndex) === "left";

  useEffect(() => {
    if (chapterIndex === 0) {
      return undefined;
    }

    const node = sectionRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [chapterIndex]);

  return (
    <section
      ref={sectionRef}
      id={anchorId}
      className={styles.section()}
      data-testid={`story-section-${chapterIndex}`}
    >
      <div className={styles.cardSlot()}>
        <div
          className={[
            onLeft ? styles.cardLeft() : styles.cardRight(),
            styles.cardMotion(),
            revealed
              ? styles.cardShown()
              : [styles.cardIdle(), onLeft ? styles.cardFromLeft() : styles.cardFromRight()].join(
                  " ",
                ),
          ].join(" ")}
        >
          <ChapterCard chapter={chapter} chapterIndex={chapterIndex} />
        </div>
      </div>
    </section>
  );
}
