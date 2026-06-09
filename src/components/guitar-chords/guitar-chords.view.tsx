import { lazy, Suspense, type CSSProperties } from "react";
import { tv } from "tailwind-variants";

import { guitarChapters, guitarStoryContent } from "./guitar-chords.content";
import { GUITAR_VH_PER_CHAPTER } from "./guitar-chords.logic";
import { MusicSymbolParticles } from "./music-symbol-particles";
import { StoryChapterNav } from "./story-chapter-nav";
import { StoryChapterSection } from "./story-chapter-section";
import type { useGuitarChords } from "./use-guitar-chords";

const GuitarChordsCanvas = lazy(() =>
  import("./guitar-chords-canvas").then((module) => ({
    default: module.GuitarChordsCanvas,
  })),
);

const guitarChords = tv({
  slots: {
    root: "relative",
    fixedBg: "pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]",
    canvasLayer: "pointer-events-none absolute inset-0 z-0",
    ui: "pointer-events-none absolute inset-0 z-10",
    cards: "relative z-10",
    hint: [
      "pointer-events-none absolute bottom-4 left-1/2 z-50 -translate-x-1/2",
      "font-display text-[0.62rem] uppercase tracking-[0.2em] text-text-muted/70 lg:hidden",
    ],
  },
});

export type GuitarChordsViewProps = ReturnType<typeof useGuitarChords>;

export function GuitarChordsView({
  enabled,
  progressRef,
  smoothRef,
  activeChapterRef,
  pointerRef,
  activeChapter,
  contentRef,
}: GuitarChordsViewProps) {
  const styles = guitarChords();

  if (!enabled) {
    return null;
  }

  const scrollRefs = { progressRef, smoothRef, activeChapterRef, pointerRef };

  return (
    <div
      ref={contentRef}
      className={styles.root()}
      style={
        {
          "--chapter-scroll-vh": `${GUITAR_VH_PER_CHAPTER}vh`,
        } as CSSProperties
      }
      data-testid="guitar-chords-root"
    >
      <div className={styles.fixedBg()} data-testid="guitar-fixed-bg">
        <div className={styles.canvasLayer()} data-testid="guitar-canvas-layer">
          <Suspense fallback={null}>
            <GuitarChordsCanvas scrollRefs={scrollRefs} />
          </Suspense>
        </div>

        <div className={styles.ui()}>
          <MusicSymbolParticles pointerRef={pointerRef} />
          <StoryChapterNav activeChapter={activeChapter} />
        </div>

        <p className={styles.hint()}>{guitarStoryContent.scrollHint}</p>
      </div>

      <div className={styles.cards()}>
        {guitarChapters.map((chapter, index) => (
          <StoryChapterSection
            key={chapter.id}
            chapter={chapter}
            chapterIndex={index}
            anchorId={chapter.navId}
          />
        ))}
      </div>
    </div>
  );
}
