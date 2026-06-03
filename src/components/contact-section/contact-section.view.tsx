import { tv } from "tailwind-variants";

import { whatsappUrl } from "../../data/portfolio";
import { SplitHeading } from "../split-heading";
import type { useContactSection } from "./use-contact-section";

const contactSection = tv({
  slots: {
    root: [
      "scroll-mt-20 border-t border-border px-5 py-24",
      "bg-linear-to-b from-surface-elevated to-surface lg:px-10 lg:py-32",
    ],
    inner: "mx-auto flex max-w-content flex-col items-start gap-8",
    intro: "max-w-xl text-body-lg text-text-muted",
    notes: "flex flex-col gap-2 text-body-sm text-text-muted",
    actions: "flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap",
    primary: [
      "inline-flex items-center justify-center rounded-stage-sm px-8 py-4",
      "font-display text-body font-semibold uppercase tracking-wide",
      "bg-accent text-surface transition-colors hover:bg-accent-muted",
    ],
    secondary: [
      "inline-flex items-center justify-center rounded-stage-sm border border-border",
      "px-8 py-4 font-display text-body-sm font-medium uppercase tracking-wide",
      "text-text-bright transition-colors hover:border-accent hover:text-accent",
    ],
  },
});

export type ContactSectionViewProps = ReturnType<typeof useContactSection>;

export function ContactSectionView({
  sectionRef,
  contact,
  content,
  brand,
}: ContactSectionViewProps) {
  const styles = contactSection();

  return (
    <section
      id="contato"
      ref={sectionRef}
      className={styles.root()}
      aria-labelledby="contato-heading"
    >
      <div className={styles.inner()}>
        <SplitHeading lines={[...content.headingLines]} accentIndex={0} />
        <h2 id="contato-heading" className="sr-only">
          {content.srHeading}
        </h2>
        <p data-reveal className={styles.intro()}>
          {content.intro(brand)}
        </p>
        <ul data-reveal className={styles.notes()}>
          {contact.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <div data-reveal className={styles.actions()}>
          <a
            href={whatsappUrl(contact.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary()}
          >
            {content.whatsappLabel}
          </a>
          <a href={contact.phoneHref} className={styles.secondary()}>
            {contact.phone}
          </a>
          <a href={contact.emailHref} className={styles.secondary()}>
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
