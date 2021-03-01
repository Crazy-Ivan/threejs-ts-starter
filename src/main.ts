// Scene
import * as THREE from "three";
import { getRenderer } from "./components/renderer";
import { getPerspectiveCamera } from "./components/camera";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ambientLight } from "./lights/ambient";
import { getPointLight } from "./lights/pointLight";
import { sphere } from "./meshes/sphere";
import {browserManager} from "./managers/browserManager";

export const run = (container: HTMLElement) => {
  const scene = new THREE.Scene();
  const renderer = getRenderer();
  const camera = getPerspectiveCamera("main");
  const canvas = renderer.domElement;

  const cameraX = getPerspectiveCamera("helper x", { far: 20, position: { x: 15, y: 0, z: 0}});
  const cameraY = getPerspectiveCamera("helper y", { far: 20, position: { x: 0, y: 15, z: 0}});
  const cameraZ = getPerspectiveCamera("helper z", { far: 20, position: { x: 0, y: 0, z: 15}});

  cameraX.lookAt(0,0,0);
  cameraY.lookAt(0,0,0);
  cameraZ.lookAt(0,0,0);

  renderer.autoClear = false;



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



    const height = browserManager.getHeight();
    const width = browserManager.getWidth();

    renderer.clear();

    renderer.setViewport(0, 0, width, height)
    renderer.render(scene, camera);


    /**
     * Helper camera renders
     */
    renderer.setViewport(0, height - height/5, width/5, height/5);
    renderer.render(scene, cameraX);

    renderer.setViewport(0, height - height/5 * 2 , width/5, height/5);
    renderer.render(scene, cameraY);

    renderer.setViewport(0 , height - height/5 * 3 , width/5, height/5);
    renderer.render(scene, cameraZ);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
