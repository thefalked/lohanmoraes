import { tv } from "tailwind-variants";

import type { useHeroSection } from "./use-hero-section";

const heroSection = tv({
  slots: {
    root: "relative flex min-h-dvh flex-col justify-end overflow-hidden",
    media: "absolute inset-0",
    image: "h-full w-full object-cover object-[center_20%]",
    wash: [
      "absolute inset-0",
      "bg-[radial-gradient(ellipse_70%_55%_at_70%_20%,rgb(224_34_183/0.2),transparent_60%)]",
      "pointer-events-none",
    ],
    scrim: [
      "absolute inset-0",
      "bg-linear-to-t from-surface via-surface/55 to-surface/10",
      "pointer-events-none",
    ],
    content: [
      "relative z-10 mx-auto flex w-full max-w-content flex-col",
      "px-5 pb-16 pt-28 lg:px-10 lg:pb-24",
    ],
    copy: "flex max-w-3xl flex-col",
    roles: "mb-5 flex flex-wrap items-center gap-x-4 gap-y-2",
    role: [
      "font-display text-body-sm font-medium uppercase tracking-[0.28em]",
      "text-accent stage-glow",
    ],
    title: [
      "font-display font-bold uppercase leading-[0.9] text-text-bright",
      "text-[clamp(3.5rem,14vw,9rem)] stage-glow-strong",
    ],
    tagline: "mt-6 max-w-xl text-body-lg text-text",
    actions: "mt-9 flex flex-wrap gap-4",
    ctaPrimary: [
      "inline-flex items-center justify-center rounded-stage-sm px-8 py-3.5",
      "bg-accent font-display text-body-sm font-semibold uppercase tracking-wide",
      "text-surface shadow-stage-card transition-all duration-200",
      "hover:bg-accent-muted hover:shadow-[0_0_32px_rgb(224_34_183/0.4)]",
    ],
    ctaSecondary: [
      "inline-flex items-center justify-center rounded-stage-sm border border-border/70 px-8 py-3.5",
      "font-display text-body-sm font-medium uppercase tracking-wide text-text-bright",
      "backdrop-blur-sm transition-colors hover:border-accent hover:text-accent",
    ],
    hint: [
      "mt-14 flex items-center gap-3 font-display text-body-sm uppercase",
      "tracking-widest text-text-muted",
    ],
    hintLine: "h-px w-14 bg-linear-to-r from-accent to-accent-secondary",
  },
});

export type HeroSectionViewProps = ReturnType<typeof useHeroSection>;

export function HeroSectionView({
  sectionRef,
  roles,
  name,
  tagline,
  content,
  onHireClick,
}: HeroSectionViewProps) {
  const styles = heroSection();

  return (
    <section ref={sectionRef} className={styles.root()} aria-label={content.ariaLabel}>
      <div className={styles.media()} aria-hidden="true">
        <img
          src={content.imageSrc}
          alt=""
          className={styles.image()}
          width={content.imageWidth}
          height={content.imageHeight}
          fetchPriority="high"
        />
        <div className={styles.wash()} />
        <div className={styles.scrim()} />
      </div>
      <div className={styles.content()}>
        <div data-hero-fade className={styles.copy()}>
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
          <div data-hero-reveal className={styles.actions()}>
            <button type="button" onClick={onHireClick} className={styles.ctaPrimary()}>
              {content.ctaPrimaryLabel}
            </button>
            <a href={content.ctaSecondaryHref} className={styles.ctaSecondary()}>
              {content.ctaSecondaryLabel}
            </a>
          </div>
          <div data-hero-reveal className={styles.hint()} aria-hidden="true">
            <span className={styles.hintLine()} />
            {content.scrollHint}
          </div>
        </div>
      </div>
    </section>
  );
}
