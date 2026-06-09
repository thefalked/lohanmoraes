import { tv } from "tailwind-variants";

import type { useHeroSection } from "./use-hero-section";

const heroSection = tv({
  slots: {
    root: "relative flex min-h-dvh flex-col justify-end overflow-hidden",
    scrim: [
      "absolute inset-x-0 bottom-0 h-2/3",
      "bg-linear-to-t from-surface/85 via-surface/35 to-transparent",
      "pointer-events-none",
    ],
    content: [
      "relative z-10 mx-auto grid w-full max-w-content items-end gap-10",
      "px-5 pb-14 pt-28 lg:grid-cols-[1fr_auto] lg:px-10 lg:pb-20",
    ],
    copy: "flex flex-col",
    roles: "mb-5 flex flex-wrap items-center gap-x-4 gap-y-2",
    role: [
      "font-display text-body-sm font-medium uppercase tracking-[0.25em]",
      "text-accent stage-glow",
    ],
    roleDot: "h-1 w-1 rounded-full bg-accent/60",
    title: [
      "font-display font-bold uppercase leading-[0.92] text-text-bright",
      "text-[clamp(3.25rem,13vw,8.5rem)] stage-glow-strong",
    ],
    tagline: "mt-6 max-w-xl text-body-lg text-text",
    actions: "mt-8 flex flex-wrap gap-4",
    ctaPrimary: [
      "inline-flex items-center justify-center rounded-stage-sm px-7 py-3.5",
      "bg-accent font-display text-body-sm font-semibold uppercase tracking-wide",
      "text-surface shadow-stage-card transition-all duration-200",
      "hover:bg-accent-muted hover:shadow-[0_0_32px_rgb(224_34_183/0.4)]",
    ],
    ctaSecondary: [
      "inline-flex items-center justify-center rounded-stage-sm border border-border px-7 py-3.5",
      "font-display text-body-sm font-medium uppercase tracking-wide text-text-bright",
      "backdrop-blur-sm transition-colors hover:border-accent hover:text-accent",
    ],
    portraitWrap: "relative hidden justify-self-end lg:block",
    portraitGlow: ["absolute -inset-4 rounded-stage bg-accent/15 blur-2xl", "pointer-events-none"],
    portrait: [
      "relative h-[26rem] w-80 rounded-stage object-cover object-top",
      "border border-border shadow-stage-card",
    ],
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
      <div className={styles.scrim()} />
      <div className={styles.content()}>
        <div data-hero-fade className={styles.copy()}>
          <div className={styles.roles()}>
            {roles.map((role, index) => (
              <span key={role} data-hero-reveal className="flex items-center gap-4">
                {index > 0 && <span className={styles.roleDot()} aria-hidden="true" />}
                <span className={styles.role()}>{role}</span>
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
            <a
              href={content.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary()}
            >
              {content.ctaPrimaryLabel}
            </a>
            <a href={content.ctaSecondaryHref} className={styles.ctaSecondary()}>
              {content.ctaSecondaryLabel}
            </a>
          </div>
          <div data-hero-reveal className={styles.hint()} aria-hidden="true">
            <span className={styles.hintLine()} />
            {content.scrollHint}
          </div>
        </div>
        {/* fade and intro tweens animate opacity on separate elements;
            sharing one element makes the scrub tween capture the intro's
            opacity:0 as its start value, locking the portrait invisible */}
        <div data-hero-fade className={styles.portraitWrap()}>
          <div data-hero-portrait className="relative">
            <div className={styles.portraitGlow()} aria-hidden="true" />
            <img
              src={content.imageSrc}
              alt={content.imageAlt}
              className={styles.portrait()}
              width={content.imageWidth}
              height={content.imageHeight}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
