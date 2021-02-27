import * as THREE from "three";

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;
material.wireframe = true;

export const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  material
);
