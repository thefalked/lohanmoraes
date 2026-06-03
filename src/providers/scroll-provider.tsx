import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { createLenis, prefersReducedMotion, type LenisInstance } from "../lib/lenis";
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
    if (prefersReducedMotion()) {
      return;
    }

    const instance = createLenis();
    setLenis(instance);

    instance.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
