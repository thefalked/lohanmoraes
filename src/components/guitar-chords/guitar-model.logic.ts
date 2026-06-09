import { Box3, Object3D, Vector3 } from "three";

export const GUITAR_TARGET_HEIGHT = 2.35;

export type GuitarOrientation = {
  rotation: [number, number, number];
  scale: number;
};

export function guitarOrientation(scene: Object3D): GuitarOrientation {
  const temp = scene.clone(true);
  const size = new Vector3();
  const box = new Box3().setFromObject(temp);
  box.getSize(size);

  let rotation: [number, number, number] = [0, 0, 0];

  if (size.z >= size.y && size.z >= size.x) {
    rotation = [-Math.PI / 2, 0, 0];
  } else if (size.x >= size.y && size.x >= size.z) {
    rotation = [0, 0, Math.PI / 2];
  }

  temp.rotation.set(...rotation);
  temp.updateMatrixWorld(true);

  const orientedBox = new Box3().setFromObject(temp);
  orientedBox.getSize(size);

  const scale = size.y > 0 ? GUITAR_TARGET_HEIGHT / size.y : 1;

  return { rotation, scale };
}
