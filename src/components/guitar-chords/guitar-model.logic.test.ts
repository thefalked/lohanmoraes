import { BoxGeometry, Mesh, Object3D } from "three";
import { describe, expect, it } from "vite-plus/test";

import { GUITAR_TARGET_HEIGHT, guitarOrientation } from "./guitar-model.logic";

function boxMesh(width: number, height: number, depth: number): Object3D {
  return new Mesh(new BoxGeometry(width, height, depth));
}

describe("guitar-model.logic", () => {
  it("stands a z-axis guitar upright on y", () => {
    const scene = boxMesh(0.7, 0.1, 1.8);
    const result = guitarOrientation(scene);
    expect(result.rotation[0]).toBeCloseTo(-Math.PI / 2, 4);
  });

  it("keeps an already upright guitar unchanged on x rotation", () => {
    const scene = boxMesh(0.7, 2, 0.2);
    const result = guitarOrientation(scene);
    expect(result.rotation).toEqual([0, 0, 0]);
    expect(result.scale).toBeCloseTo(GUITAR_TARGET_HEIGHT / 2, 4);
  });
});
