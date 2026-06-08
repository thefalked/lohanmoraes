import { describe, expect, it } from "vite-plus/test";

import {
  getCanvasDpr,
  lerpPhase,
  particleCountForViewport,
  sectionPhase,
  shouldRenderStageExperience,
} from "./stage-experience.logic";

describe("stage-experience.logic", () => {
  it("caps dpr on desktop and mobile", () => {
    expect(getCanvasDpr(3, 1280)).toBe(1.75);
    expect(getCanvasDpr(3, 400)).toBe(1.25);
    expect(getCanvasDpr(0.5, 1280)).toBe(1);
  });

  it("maps scroll progress to section phases", () => {
    expect(sectionPhase(0)).toBe("hero");
    expect(sectionPhase(0.3)).toBe("orbit");
    expect(sectionPhase(0.7)).toBe("depth");
    expect(sectionPhase(0.95)).toBe("finale");
  });

  it("lerps toward target progress", () => {
    expect(lerpPhase(0, 1, 0.5)).toBe(0.5);
    expect(lerpPhase(0.5, 1, 0)).toBe(0.5);
  });

  it("gates rendering on motion preference", () => {
    expect(shouldRenderStageExperience(true)).toBe(true);
    expect(shouldRenderStageExperience(false)).toBe(false);
  });

  it("scales particle counts by viewport", () => {
    expect(particleCountForViewport(320)).toBe(192);
    expect(particleCountForViewport(1024)).toBe(640);
  });
});
