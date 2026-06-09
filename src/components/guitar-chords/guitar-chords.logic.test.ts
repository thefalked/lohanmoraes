import { describe, expect, it } from "vite-plus/test";

import { guitarPhotoAsset } from "./guitar-chords.content";
import {
  cameraPosition,
  chapterIndex,
  chapterOpacity,
  chapterPanelSide,
  chapterRevealProgress,
  chapterScrollProgress,
  experienceScrollProgress,
  experienceScrollY,
  chapterSectionTop,
  chapterSectionLabel,
  chapterSnapProgress,
  createAnimatedMusicParticles,
  GUITAR_CHAPTER_COUNT,
  GUITAR_VH_PER_CHAPTER,
  domMusicParticleCount,
  guitarParticleCount,
  guitarBodyFocusY,
  guitarPlaneContentBottomY,
  guitarPlaneContentTopY,
  guitarPlaneOffsetY,
  guitarPlaneSize,
  pinScrollHeight,
  scrollProgressPercent,
  shouldRenderGuitarChords,
  shouldSnapExperienceProgress,
  stepMusicParticle,
} from "./guitar-chords.logic";

describe("guitar-chords.logic", () => {
  it("sizes the guitar plane from native image dimensions", () => {
    const plane = guitarPlaneSize();
    expect(plane.height).toBeCloseTo(guitarPhotoAsset.sceneHeight, 4);
    expect(plane.width).toBeCloseTo(
      (guitarPhotoAsset.nativeWidth / guitarPhotoAsset.nativeHeight) * guitarPhotoAsset.sceneHeight,
      4,
    );
  });

  it("descends camera Y from headstock to body with fixed zoom", () => {
    const start = cameraPosition(0);
    const end = cameraPosition(1);
    const offsetY = guitarPlaneOffsetY();
    const visibleHalf = 1.52 * Math.tan((30 * Math.PI) / 360);
    const headstockY = offsetY + guitarPlaneContentTopY();
    const bottomY = offsetY + guitarPlaneContentBottomY();
    expect(start.position.y).toBeCloseTo(headstockY - visibleHalf + 0.02, 2);
    expect(end.position.y).toBeCloseTo(bottomY + visibleHalf - 0.02, 2);
    expect(start.lookAt.y).toBeGreaterThan(end.lookAt.y);
    expect(start.position.x).toBeCloseTo(end.position.x, 5);
    expect(start.position.z).toBeCloseTo(end.position.z, 5);
    expect(start.position.z).toBeCloseTo(1.52, 2);
    expect(start.fov).toBe(30);
  });

  it("anchors the guitar plane on the body focus point", () => {
    expect(guitarPlaneOffsetY()).toBeCloseTo(-guitarBodyFocusY(), 4);
    expect(guitarBodyFocusY()).toBeLessThan(0);
  });

  it("alternates panel sides by chapter index", () => {
    expect(chapterPanelSide(0)).toBe("left");
    expect(chapterPanelSide(1)).toBe("right");
    expect(chapterPanelSide(2)).toBe("left");
    expect(chapterSectionTop(2)).toBe(`${2 * GUITAR_VH_PER_CHAPTER}vh`);
  });

  it("maps scroll progress to chapter indices", () => {
    expect(chapterIndex(0)).toBe(0);
    expect(chapterIndex(0.05)).toBe(0);
    expect(chapterIndex(0.99)).toBe(GUITAR_CHAPTER_COUNT - 1);
    expect(chapterIndex(1)).toBe(GUITAR_CHAPTER_COUNT - 1);
  });

  it("peaks chapter opacity at chapter center", () => {
    const center = chapterScrollProgress(2, GUITAR_CHAPTER_COUNT);
    expect(chapterOpacity(center, 2)).toBe(1);
    expect(chapterOpacity(0, 2)).toBeLessThan(0.5);
  });

  it("peaks chapter reveal at chapter center with a hold plateau", () => {
    const center = chapterScrollProgress(1, GUITAR_CHAPTER_COUNT);
    const span = 1 / GUITAR_CHAPTER_COUNT;
    expect(chapterRevealProgress(center, 1)).toBe(1);
    expect(chapterRevealProgress(center + span * 0.2, 1)).toBe(1);
    expect(chapterRevealProgress(0, 1)).toBeLessThan(0.4);
  });

  it("derives section labels and scroll progress", () => {
    expect(chapterSectionLabel(0)).toBe("Intro");
    expect(chapterSectionLabel(3)).toBe("Sobre");
    expect(chapterSectionLabel(4)).toBe("Shows");
    expect(scrollProgressPercent(0)).toBeCloseTo((1 / GUITAR_CHAPTER_COUNT) * 100, 4);
  });

  it("snaps scroll progress to chapter centers", () => {
    expect(chapterSnapProgress(0)).toBe(chapterScrollProgress(0));
    expect(chapterSnapProgress(0.04)).toBe(chapterScrollProgress(0));
    expect(chapterSnapProgress(1)).toBe(chapterScrollProgress(GUITAR_CHAPTER_COUNT - 1));
  });

  it("does not snap backward when the reader scrolls past a chapter", () => {
    expect(shouldSnapExperienceProgress(1, 0.962)).toBe(false);
    expect(shouldSnapExperienceProgress(0.962, 0.962)).toBe(false);
    expect(shouldSnapExperienceProgress(0.9, 0.962)).toBe(true);
  });

  it("scales particle counts by viewport", () => {
    expect(guitarParticleCount(320)).toBe(48);
    expect(guitarParticleCount(1280)).toBe(96);
    expect(domMusicParticleCount(320)).toBe(22);
    expect(domMusicParticleCount(1280)).toBe(42);
  });

  it("gates rendering on motion preference", () => {
    expect(shouldRenderGuitarChords(true)).toBe(true);
    expect(shouldRenderGuitarChords(false)).toBe(false);
  });

  it("maps experience scroll position to progress and back", () => {
    const viewport = 900;
    const height = 1300;
    expect(experienceScrollProgress(0, height, viewport)).toBe(0);
    expect(experienceScrollProgress(-400, height, viewport)).toBeCloseTo(400 / 400, 4);
    expect(experienceScrollProgress(-800, height, viewport)).toBe(1);
    expect(experienceScrollY(0.5, 0, height, viewport)).toBeCloseTo(200, 4);
  });

  it("returns pin scroll height scaled to chapter count", () => {
    expect(pinScrollHeight()).toBe(`${GUITAR_CHAPTER_COUNT * GUITAR_VH_PER_CHAPTER}vh`);
  });

  it("drifts music particles and pushes them away from the cursor", () => {
    const [particle] = createAnimatedMusicParticles(1);
    const startX = particle.x;
    const startY = particle.y;

    stepMusicParticle(particle, { x: 0.5, y: 0.5, active: 0 }, 1 / 60);
    expect(particle.x !== startX || particle.y !== startY).toBe(true);

    const nearCursor = createAnimatedMusicParticles(1)[0];
    nearCursor.x = 0.52;
    nearCursor.y = 0.52;
    const beforeX = nearCursor.x;
    stepMusicParticle(nearCursor, { x: 0.5, y: 0.5, active: 1 }, 1 / 60);
    expect(nearCursor.x).toBeGreaterThan(beforeX);
  });
});
