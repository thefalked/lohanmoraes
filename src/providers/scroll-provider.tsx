import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { createLenis, prefersReducedMotion, type LenisInstance } from "../lib/lenis";
import { initPerfProfile } from "../lib/performance";
import { gsap, ScrollTrigger } from "../lib/motion";

const LenisContext = createContext<LenisInstance | null>(null);

export function useLenis(): LenisInstance | null {
  return useContext(LenisContext);
}

type ScrollProviderProps = {
  children: ReactNode;
};

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null);

  useEffect(() => {
    initPerfProfile();

    if (prefersReducedMotion()) {
      return;
    }

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    const instance = createLenis();
    setLenis(instance);

    instance.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    // Mild lag smoothing keeps first-scroll wheel input from stuttering under load.
    gsap.ticker.lagSmoothing(500, 33);

    const onRefresh = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    // Refresh after layout + fonts settle so fade triggers land correctly.
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => {
      refresh();
      requestAnimationFrame(refresh);
    });
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
