import { createContext, useContext, type ReactNode } from "react";

export type GuitarPointer = {
  x: number;
  y: number;
  uvX: number;
  uvY: number;
  active: number;
};

export type GuitarScrollRefs = {
  progressRef: { current: number };
  smoothRef: { current: number };
  activeChapterRef: { current: number };
  pointerRef: { current: GuitarPointer };
};

export const defaultGuitarPointer = (): GuitarPointer => ({
  x: 0,
  y: 0,
  uvX: 0.5,
  uvY: 0.5,
  active: 0,
});

const GuitarScrollContext = createContext<GuitarScrollRefs | null>(null);

type GuitarScrollProviderProps = {
  value: GuitarScrollRefs;
  children: ReactNode;
};

export function GuitarScrollProvider({ value, children }: GuitarScrollProviderProps) {
  return <GuitarScrollContext.Provider value={value}>{children}</GuitarScrollContext.Provider>;
}

export function useGuitarScroll(): GuitarScrollRefs {
  const ctx = useContext(GuitarScrollContext);
  if (!ctx) {
    throw new Error("useGuitarScroll must be used within GuitarChordsExperience");
  }
  return ctx;
}
