import { useEffect, useRef } from "react";

import { ScrollTrigger, isMotionEnabled } from "../../lib/motion";
import { shouldRenderStageExperience } from "./stage-experience.logic";

export function useStageExperience() {
  const enabled = shouldRenderStageExperience(isMotionEnabled());
  const progressRef = useRef(0);
  const smoothRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [enabled]);

  return {
    enabled,
    progressRef,
    smoothRef,
  };
}
