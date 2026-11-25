import { useEffect, useState, type MouseEventHandler } from "react";

import {
  scrollToHashTarget,
  scrollToTop,
  shouldHandleHashNavigation,
} from "../../lib/navigation.logic";
import { useBooking } from "../../providers/booking-provider";
import { useLenis } from "../../providers/scroll-provider";
import { siteHeaderContent } from "./site-header.content";

export function useSiteHeader() {
  const lenis = useLenis();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHomeClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (!shouldHandleHashNavigation(event)) {
      return;
    }
    event.preventDefault();
    scrollToTop({ lenis });
  };

  const onNavClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (!shouldHandleHashNavigation(event)) {
      return;
    }
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    if (href) {
      scrollToHashTarget(href, { lenis });
    }
  };

  return {
    scrolled,
    onHomeClick,
    onNavClick,
    onHireClick: () => openBooking(),
    hireLabel: siteHeaderContent.hireLabel,
  };
}
