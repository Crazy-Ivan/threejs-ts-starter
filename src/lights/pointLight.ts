import * as THREE from "three";
import { gui } from "../utils/gui";

const defaultConfig = {
  color: 0xf06908,
  intensity: 0.5,
  position: {
    x: 1,
    y: 1,
    z: 1,
  },
};

export const getPointLight = (
  name: string,
  config: Partial<typeof defaultConfig> = defaultConfig
) => {
  const c = {...defaultConfig, ...config };
  const pointLight = new THREE.PointLight(c.color, c.intensity);
  pointLight.position.x = c.position.x;
  pointLight.position.y = c.position.y;
  pointLight.position.z = c.position.z;

  const folder = gui.addFolder(`point light: ${name}`);
  folder.open();
  folder.add(pointLight, "intensity").min(0).max(1);
  folder.add(pointLight.position, "x").min(0).max(100);
  folder.add(pointLight.position, "y").min(0).max(100);
  folder.add(pointLight.position, "z").min(0).max(100);
  folder
    .addColor(c, "color")
    .onChange((c) => (pointLight.color = new THREE.Color(c)));

  return pointLight;
};
