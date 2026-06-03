import { tv } from "tailwind-variants";

import { navItems, site } from "../../data/portfolio";
import type { useSiteHeader } from "./use-site-header";
import { siteHeaderContent } from "./site-header.content";

const siteHeader = tv({
  slots: {
    root: [
      "fixed inset-x-0 top-0 z-50 flex items-center justify-between",
      "px-5 py-4 transition-colors duration-300 lg:px-10",
    ],
    rootScrolled: "bg-surface/80 backdrop-blur-md",
    brandLink: "flex items-center gap-3",
    logo: "h-9 w-auto max-w-[140px] object-contain lg:h-10",
    nav: "hidden items-center gap-8 lg:flex",
    link: [
      "font-display text-body-sm font-medium uppercase tracking-widest",
      "text-text-muted transition-colors hover:text-accent",
    ],
    menuBtn: "font-display text-body-sm uppercase text-accent lg:hidden",
  },
});

export type SiteHeaderViewProps = ReturnType<typeof useSiteHeader>;

export function SiteHeaderView({ scrolled, onHomeClick, onNavClick }: SiteHeaderViewProps) {
  const styles = siteHeader();
  const contactHref = navItems.find((item) => item.id === "contato")?.href ?? "#contato";

  return (
    <header className={styles.root({ className: scrolled ? styles.rootScrolled() : "" })}>
      <a href="/" className={styles.brandLink()} onClick={onHomeClick}>
        <img
          src={site.logoImage}
          alt={site.name}
          className={styles.logo()}
          width={140}
          height={40}
        />
      </a>
      <nav className={styles.nav()} aria-label={siteHeaderContent.navAriaLabel}>
        {navItems.map((item) => (
          <a key={item.id} href={item.href} className={styles.link()} onClick={onNavClick}>
            {item.label}
          </a>
        ))}
      </nav>
      <a href={contactHref} className={styles.menuBtn()} onClick={onNavClick}>
        {siteHeaderContent.mobileContactLabel}
      </a>
    </header>
  );
}
