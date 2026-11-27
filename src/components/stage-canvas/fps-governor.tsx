import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

type FpsGovernorProps = {
  dprMax: number;
};

/**
 * Soft DPR governor. Avoids thrashing on the first seconds of scroll.
 * Pauses rendering when the tab is hidden.
 */
export function FpsGovernor({ dprMax }: FpsGovernorProps) {
  const setDpr = useThree((state) => state.setDpr);
  const set = useThree((state) => state.set);
  const regress = useThree((state) => state.performance.regress);
  const level = useRef(1);
  const samples = useRef<number[]>([]);
  const coolDown = useRef(4);
  const warmedUp = useRef(false);
  const bootFrames = useRef(0);

  useEffect(() => {
    // Start conservative, then climb to the tier cap after warmup.
    setDpr(Math.min(1.25, dprMax));
    const onVisibility = () => {
      set({ frameloop: document.hidden ? "never" : "always" });
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [dprMax, set, setDpr]);

  useFrame((_, delta) => {
    if (document.hidden) {
      return;
    }

    bootFrames.current += 1;
    if (!warmedUp.current) {
      if (bootFrames.current < 90) {
        return;
      }
      warmedUp.current = true;
      level.current = 1;
      setDpr(dprMax);
      coolDown.current = 3;
      return;
    }

    samples.current.push(delta);
    if (samples.current.length < 45) {
      return;
    }

    const avg = samples.current.reduce((sum, value) => sum + value, 0) / samples.current.length;
    samples.current.length = 0;
    coolDown.current = Math.max(0, coolDown.current - 1);
    if (coolDown.current > 0) {
      return;
    }

    if (avg > 0.024 && level.current > 0.6) {
      level.current = Math.max(0.6, level.current - 0.1);
      setDpr(Math.max(1, dprMax * level.current));
      regress();
      coolDown.current = 4;
      return;
    }

    if (avg < 0.012 && level.current < 1) {
      level.current = Math.min(1, level.current + 0.05);
      setDpr(Math.min(dprMax, dprMax * level.current));
      coolDown.current = 5;
    }
  });

  return null;
}
