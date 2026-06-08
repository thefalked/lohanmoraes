import { tv } from "tailwind-variants";

import type { useHeroSection } from "./use-hero-section";

const heroSection = tv({
  slots: {
    root: "relative flex min-h-dvh flex-col justify-end overflow-hidden",
    lcpImage: "sr-only",
    scrim: [
      "absolute inset-0 bg-linear-to-t from-surface/85 via-surface/35 to-transparent",
      "pointer-events-none",
    ],
    scrimSide: "absolute inset-0 bg-surface/15 pointer-events-none",
    content: "relative z-20 mx-auto w-full max-w-content px-5 pb-16 pt-32 lg:px-10 lg:pb-24",
    roles: "mb-4 flex flex-wrap gap-3",
    role: [
      "font-display text-body-sm font-medium uppercase tracking-[0.2em]",
      "text-accent stage-glow",
    ],
    title: [
      "font-display text-display-xl font-bold uppercase leading-none",
      "text-text-bright stage-glow-strong lg:text-[5rem]",
    ],
    tagline: "mt-4 max-w-xl text-body-lg text-text-muted",
    hint: [
      "mt-12 flex items-center gap-3 font-display text-body-sm uppercase",
      "tracking-widest text-text-muted",
    ],
    hintLine: "h-px w-12 bg-accent",
  },
});

export type HeroSectionViewProps = ReturnType<typeof useHeroSection>;

export function HeroSectionView({
  sectionRef,
  roles,
  name,
  tagline,
  content,
}: HeroSectionViewProps) {
  const styles = heroSection();

  return (
    <section ref={sectionRef} className={styles.root()} aria-label={content.ariaLabel}>
      <img
        src={content.imageSrc}
        alt={content.imageAlt}
        className={styles.lcpImage()}
        width={content.imageWidth}
        height={content.imageHeight}
        fetchPriority="high"
      />
      <div className={styles.scrimSide()} />
      <div className={styles.scrim()} />
      <div className={styles.content()}>
        <div className={styles.roles()}>
          {roles.map((role) => (
            <span key={role} data-hero-reveal className={styles.role()}>
              {role}
            </span>
          ))}
        </div>
        <h1 data-hero-reveal className={styles.title()}>
          {name}
        </h1>
        <p data-hero-reveal className={styles.tagline()}>
          {tagline}
        </p>
        <div data-hero-reveal className={styles.hint()} aria-hidden="true">
          <span className={styles.hintLine()} />
          {content.scrollHint}
        </div>
      </div>
    </section>
  );
}
