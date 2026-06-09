import { tv } from "tailwind-variants";

import { contact, site, whatsappUrl } from "../../data/portfolio";

const siteFooter = tv({
  slots: {
    root: "border-t border-border bg-surface/70 px-5 py-10 backdrop-blur-md lg:px-10",
    inner:
      "mx-auto flex max-w-content flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
    copy: "text-body-sm text-text-muted",
    links: "flex flex-wrap gap-4 text-body-sm",
    link: "text-accent-muted hover:text-accent",
  },
});

export function SiteFooterView() {
  const styles = siteFooter();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.root()}>
      <div className={styles.inner()}>
        <p className={styles.copy()}>
          &copy; {year} {site.name}, {site.brand} ({site.brandLegal}).
        </p>
        <div className={styles.links()}>
          <a href={contact.phoneHref} className={styles.link()}>
            {contact.phone}
          </a>
          <a href={contact.emailHref} className={styles.link()}>
            {contact.email}
          </a>
          <a
            href={whatsappUrl(contact.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link()}
          >
            WhatsApp
          </a>
          <a
            href={contact.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link()}
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
