import { createContext, useContext, type ReactNode } from "react";

export type StageScrollRefs = {
  progressRef: { current: number };
  smoothRef: { current: number };
};

const StageScrollContext = createContext<StageScrollRefs | null>(null);

type StageScrollProviderProps = {
  value: StageScrollRefs;
  children: ReactNode;
};

export function StageScrollProvider({ value, children }: StageScrollProviderProps) {
  return <StageScrollContext.Provider value={value}>{children}</StageScrollContext.Provider>;
}

export function useStageScroll(): StageScrollRefs {
  const ctx = useContext(StageScrollContext);
  if (!ctx) {
    throw new Error("useStageScroll must be used within StageExperience");
  }
  return ctx;
}
