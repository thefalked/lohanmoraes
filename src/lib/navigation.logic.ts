import type { LenisInstance } from "./lenis";

export const HEADER_SCROLL_OFFSET = 72;

export function hashFromHref(href: string): string {
  return href.replace(/^#/, "");
}

export function shouldHandleHashNavigation(event: {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function scrollToHashTarget(
  href: string,
  options: { lenis: LenisInstance | null; offset?: number },
): void {
  const id = hashFromHref(href);
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const offset = options.offset ?? HEADER_SCROLL_OFFSET;
  if (options.lenis) {
    options.lenis.scrollTo(target, { offset });
    return;
  }

  target.scrollIntoView({ behavior: "smooth" });
}

export function scrollToTop(options: { lenis: LenisInstance | null }): void {
  if (options.lenis) {
    options.lenis.scrollTo(0);
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
