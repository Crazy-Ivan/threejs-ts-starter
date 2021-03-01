import * as THREE from "three";
import { gui } from "../utils/gui";
import { browserManager } from "../managers/browserManager";

const defaultValues = {
  fov: 45,
  aspect: browserManager.getWidth() / browserManager.getHeight(),
  near: 1,
  far: 15,
  position: { x: 2, y: 2, z: 2 },
};

export const getPerspectiveCamera = (
  name: string,
  options: Partial<typeof defaultValues> = defaultValues
): THREE.PerspectiveCamera => {
  const o = { ...defaultValues, ...options };

  const { fov, aspect, near, far, position } = o;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  const update = () => camera.updateProjectionMatrix();

  browserManager.onResize((width, height) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  camera.position.set(position.x, position.y, position.z);

  const cameraFolder = gui.addFolder(`camera: ${name}`);
  cameraFolder.add(camera, "fov").min(1).max(180).onFinishChange(update);
  cameraFolder.add(camera, "far").min(2).max(1000).onFinishChange(update);
  cameraFolder.add(camera, "near").min(1).max(100).onFinishChange(update);
  cameraFolder.add(camera.position, "x").min(-50).max(50);
  cameraFolder.add(camera.position, "y").min(-50).max(50);
  cameraFolder.add(camera.position, "z").min(-50).max(50);

  return camera;
};
