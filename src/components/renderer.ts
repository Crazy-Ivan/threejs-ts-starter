import * as THREE from "three";
import { browserManager } from "../managers/browserManager";

export const getRenderer = (): THREE.WebGLRenderer => {
  const defaultValues = {
    antialias: false,
    alpha: false,
  };

  // Create WebGL renderer and set its antialias
  const renderer = new THREE.WebGLRenderer({
    antialias: defaultValues.antialias,
    alpha: defaultValues.alpha,
  });

  renderer.setPixelRatio(browserManager.getPixelRatio()); // For retina
  renderer.setSize(browserManager.getWidth(), browserManager.getHeight());


  browserManager.onResize((width, height) => {
    renderer.setSize(width, height);
  });

  return renderer;
};
