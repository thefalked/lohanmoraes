import { lazy, Suspense } from "react";
import { tv } from "tailwind-variants";

import type { useStageExperience } from "./use-stage-experience";

const StageExperienceCanvas = lazy(() =>
  import("./stage-experience-canvas").then((module) => ({ default: module.StageExperienceCanvas })),
);

const stageExperience = tv({
  slots: {
    root: "pointer-events-none fixed inset-0 -z-10",
    overlay: [
      "pointer-events-none absolute inset-0 z-10",
      "bg-linear-to-b from-transparent via-surface/25 to-surface/55",
    ],
  },
});

export type StageExperienceViewProps = ReturnType<typeof useStageExperience>;

export function StageExperienceView({ enabled, progressRef, smoothRef }: StageExperienceViewProps) {
  const styles = stageExperience();

  if (!enabled) {
    return null;
  }

  return (
    <div className={styles.root()} data-testid="stage-experience-root" aria-hidden="true">
      <Suspense fallback={null}>
        <StageExperienceCanvas scrollRefs={{ progressRef, smoothRef }} />
      </Suspense>
      <div className={styles.overlay()} />
    </div>
  );
}
