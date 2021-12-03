import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { ColorGUIHelper } from "../utils/colorGUIHelper";
import { piramide } from "../utils/piramide";
import { box } from "../utils/piramide";
import { rotateObject } from "../utils/rotate";
import { CameraHelper } from "three";

class Qbert {
  constructor(posicion, lifes) {
    this.posicion = posicion;
    this.lifes = lifes;
  }

  move(position) {}
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

/**
 * Debug
 */
const gui = new dat.GUI();

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

const color1 = new THREE.Color(`#2f4845`);
const color2 = new THREE.Color(`#56a999`);
const color3 = new THREE.Color(`#5742e5`);

const colors = {
  x: color1,
  y: color2,
  z: color3,
};

let map = piramide(7, colors);
scene.add(map);

// Camera
const camera = new THREE.OrthographicCamera(-7, 12, 12, -7, 0.1, 1000);

camera.position.set(-86.5, 86.1, -79);
camera.lookAt(3.5, 3.5, 3.5);

scene.add(camera);

scene.background = new THREE.Color("#000");

// Lights

// Create a directional light
const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 9);

let mainLight = new THREE.DirectionalLight(0xffffff, 3.0);
scene.add(ambientLight);

// move the light back and up a bit
mainLight.position.set(5, 5, 5);

const lightColor = new THREE.Color(`#2f4845`);

const lightOptions = {
  color: lightColor,
  intensity: 1,
  position: {
    x: 5,
    y: 5,
    z: 5,
  },
  target: {
    x: -5,
    y: 5,
    z: 5,
  },
};

let light = new THREE.DirectionalLight(
  lightOptions.color,
  lightOptions.intensity
);
light.position.set(
  lightOptions.position.x,
  lightOptions.position.y,
  lightOptions.position.z
);
light.target.position.set(
  lightOptions.target.x,
  lightOptions.target.y,
  lightOptions.target.z
);
scene.add(light);
scene.add(light.target);

let DL_helper = new THREE.DirectionalLightHelper(light, 5);
scene.add(DL_helper);

// AxeHelper
const axesHelper = new THREE.AxesHelper(7);
scene.add(axesHelper);

// remember to add the light to the scene
//scene.add(ambientLight, mainLight);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.gammaOutput = true;
renderer.physicallyCorrectLights = true;

const controls = new OrbitControls(camera, canvas);

controls.target.set(3.5, 3.5, 3.5);

controls.update();

// Animate
const clock = new THREE.Clock();

const look = { x: 3.5, y: 3.5, z: 3.5 };

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //mesh.rotation.y = elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

const gui_folder_light = gui.addFolder(`Light`);
const gui_folder_camera = gui.addFolder(`Camera`);
const gui_folder_camera_size = gui.addFolder("Camera size");
const gui_folder_cube = gui.addFolder(`Cube`);
const gui_folder_helpers = gui.addFolder(`Helpers`);

let cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

const update_camera = () => {
  camera.lookAt(look.x, look.y, look.z);
  controls.update();
  cameraHelper.update();
  camera.updateProjectionMatrix();
};

const update_color = () => {
  scene.remove(map);
  map = piramide(7, colors);
  scene.add(map);
};

const update_light = () => {
  light.color = lightOptions.color;
  light.intensity = lightOptions.intensity;
  light.position.x = lightOptions.position.x;

  light.position.y = lightOptions.position.y;
  light.position.z = lightOptions.position.z;

  light.target.position.x = lightOptions.target.x;
  light.target.position.y = lightOptions.target.y;
  light.target.position.z = lightOptions.target.z;

  DL_helper.update();
};

gui_folder_camera_size.add(camera, "top", -10, 10).onChange(update_camera);
gui_folder_camera_size.add(camera, "right", -10, 10).onChange(update_camera);
gui_folder_camera_size.add(camera, "bottom", -10, 10).onChange(update_camera);
gui_folder_camera_size.add(camera, "left", -10, 10).onChange(update_camera);
gui_folder_camera_size.add(camera, "near", -10, 10).onChange(update_camera);
gui_folder_camera_size.add(camera, "far", -200, 200).onChange(update_camera);

gui_folder_camera
  .add(camera.position, "x", -200, 0, 0.1)
  .name("position X")
  .onChange(update_camera);
gui_folder_camera
  .add(camera.position, "y", -100, 100, 0.1)
  .name("position Y")
  .onChange(update_camera);
gui_folder_camera
  .add(camera.position, "z", -100, 100, 0.1)
  .name("position Z")
  .onChange(update_camera);

gui_folder_light
  .add(lightOptions, "intensity", 0, 5, 0.01)
  .onChange(update_light);

gui_folder_light
  .add(lightOptions.position, "x", -40, 40)
  .name("position X")
  .onChange(update_light);
gui_folder_light
  .add(lightOptions.position, "y", -40, 40)
  .name("position Y")
  .onChange(update_light);
gui_folder_light
  .add(lightOptions.position, "z", -40, 40)
  .name("position Z")
  .onChange(update_light);
gui_folder_light
  .add(lightOptions.target, "x", -40, 40)
  .name("target X")
  .onChange(update_light);
gui_folder_light
  .add(lightOptions.target, "y", -40, 40)
  .name("target Y")
  .onChange(update_light);
gui_folder_light
  .add(lightOptions.target, "z", -40, 40)
  .name("target Z")
  .onChange(update_light);
gui_folder_light
  .addColor(new ColorGUIHelper(lightOptions, "color"), "value", "color")
  .name("color")
  .onChange(update_light);

gui_folder_cube
  .addColor(new ColorGUIHelper(colors, "x"), "value", "right face")
  .name("color")
  .onChange(update_color);

gui_folder_cube
  .addColor(new ColorGUIHelper(colors, "y"), "value", "top face")
  .name("color")
  .onChange(update_color);

gui_folder_cube
  .addColor(new ColorGUIHelper(colors, "z"), "value", "left face")
  .name("color")
  .onChange(update_color);

gui_folder_helpers.add(cameraHelper, "visible", true, false).name("camera");
gui_folder_helpers.add(DL_helper, "visible", true, false).name("light");
gui_folder_helpers.add(axesHelper, "visible", true, false).name("axes");
