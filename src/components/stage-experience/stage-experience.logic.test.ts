import { describe, expect, it } from "vite-plus/test";

import type { Texture } from "three";

import {
  getCanvasDpr,
  lerpPhase,
  particleCountForViewport,
  planeDimensions,
  sectionPhase,
  shouldRenderStageExperience,
  textureImageSize,
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

  it("fits plane dimensions within max size preserving aspect", () => {
    const landscape = planeDimensions(1920, 1080, 5.2);
    expect(landscape.width).toBe(5.2);
    expect(landscape.height).toBeCloseTo(2.925, 5);

    const portrait = planeDimensions(1080, 1920, 3.2);
    expect(portrait.width).toBeCloseTo(1.8, 5);
    expect(portrait.height).toBe(3.2);

    expect(planeDimensions(1000, 1000, 4)).toEqual({ width: 4, height: 4 });
  });

  it("scales particle counts by viewport", () => {
    expect(particleCountForViewport(320)).toBe(192);
    expect(particleCountForViewport(1024)).toBe(640);
  });

  it("reads texture dimensions from loaded image metadata", () => {
    expect(textureImageSize({ image: null } as Texture)).toEqual({ width: 1, height: 1 });
    expect(
      textureImageSize({
        image: { naturalWidth: 3377, naturalHeight: 6002 },
      } as Texture),
    ).toEqual({ width: 3377, height: 6002 });
    expect(
      textureImageSize({
        image: { width: 800, height: 600 },
      } as Texture),
    ).toEqual({ width: 800, height: 600 });
  });
});
