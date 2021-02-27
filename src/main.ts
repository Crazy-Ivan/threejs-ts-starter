// Scene
import * as THREE from "three";
import { getRenderer } from "./components/renderer";
import { getPerspectiveCamera } from "./components/camera";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ambientLight } from "./lights/ambient";
import { getPointLight } from "./lights/pointLight";
import { sphere } from "./meshes/sphere";

export const run = (container: HTMLElement) => {
  const scene = new THREE.Scene();
  const renderer = getRenderer();
  const camera = getPerspectiveCamera("main");
  const canvas = renderer.domElement;

  scene.add(sphere);

  /**
   * Lights
   */

  const pointLight = getPointLight("sun");
  scene.add(ambientLight);
  scene.add(pointLight);



  /**
   * Helpers
   */
  const axesHelper = new THREE.AxesHelper( 1 );
  scene.add( axesHelper );

  const gridHelper = new THREE.GridHelper( 10, 15 );
  scene.add( gridHelper );

  /**
   * Controls
   */
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  container.appendChild(canvas);

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    sphere.rotation.x = 0.15 * elapsedTime;

    // Update controls
    controls.update();


    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
