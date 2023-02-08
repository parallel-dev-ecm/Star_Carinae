import { proxy } from "valtio";
import { useProxy } from "valtio/utils";
import * as THREE from "three";

const initialVector = new THREE.Vector3();
const initialScene = new THREE.Object3D();
const store = proxy({
  open: false,
  controlsTarget: initialVector,
  scene: initialScene,
  controls: null,
});
export const useStore = () => useProxy(store);
