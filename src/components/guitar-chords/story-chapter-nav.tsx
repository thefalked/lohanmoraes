import { tv } from "tailwind-variants";

import { activeStorySection, guitarStorySections } from "./guitar-chords.logic";

const storyNav = tv({
  slots: {
    sections: [
      "pointer-events-none absolute inset-x-0 bottom-0 z-40 flex flex-wrap justify-center gap-x-6 gap-y-2",
      "border-t border-border/40 bg-surface/20 px-6 py-4 backdrop-blur-sm",
      "font-display text-[0.65rem] uppercase tracking-[0.18em]",
      "lg:justify-between lg:px-10",
    ],
    sectionLabel: "transition-colors duration-300",
    sectionActive: "text-accent",
    sectionIdle: "text-text-muted/55",
  },
});

export function StoryChapterNav({ activeChapter }: { activeChapter: number }) {
  const styles = storyNav();
  const sections = guitarStorySections();
  const activeSection = activeStorySection(activeChapter, sections);

  return (
    <nav className={styles.sections()} aria-label="Seções da história">
      {sections.map((section) => {
        const isActive = section.id === activeSection.id;
        return (
          <span
            key={section.id}
            className={styles.sectionLabel({
              className: isActive ? styles.sectionActive() : styles.sectionIdle(),
            })}
          >
            {section.label}
          </span>
        );
      })}
    </nav>
  );
}
