import * as THREE from "three";
import { gui } from "../utils/gui";

const config = {
  color: 0xffffff,
  intensity: 0.5,
};

export const ambientLight = new THREE.AmbientLight(
  config.color,
  config.intensity
);

const folder = gui.addFolder("ambient light");
folder.open();
folder.add(ambientLight, "intensity").min(0).max(1);
folder
  .addColor(config, "color")
  .onChange((c) => (ambientLight.color = new THREE.Color(c)));
