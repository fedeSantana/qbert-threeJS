import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { ColorGUIHelper } from '../utils/colorGUIHelper'
import { piramide } from '../utils/piramide'
import { box } from '../utils/piramide'
import { rotateObject } from '../utils/rotate'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Debug
 */
const gui = new dat.GUI();

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

const map = piramide(7);
scene.add(map);

const color1 = new THREE.Color(`hsl( 20, 40%, 50%)`);
const color2 = new THREE.Color(`hsl( 80, 70%, 60%)`);
const color3 = new THREE.Color(`hsl( 140 , 70%, 60%)`);

const geometrys = {
    x: new THREE.PlaneGeometry(1, 1),
    y: new THREE.PlaneGeometry(1, 1),
    z: new THREE.PlaneGeometry(1, 1),
}

const materials = {
    x: new THREE.MeshStandardMaterial({
        color: color1,
        flatShading: true,
        side: THREE.DoubleSide
    }),
    y: new THREE.MeshStandardMaterial({
        color: color2,
        flatShading: true,
        side: THREE.DoubleSide
    }),
    z: new THREE.MeshStandardMaterial({
        color: color3,
        flatShading: true,
        side: THREE.DoubleSide
    }),
}


// Camera
const camera = new THREE.OrthographicCamera(-8, 8, 8, - 8, 0.1, 1000)

camera.position.set(-100, 80, -50);
camera.lookAt(3.5, 3.5, 3.5);

scene.add(camera)


scene.background = new THREE.Color("#000");

// Create a directional light
const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 9);
let mainLight = new THREE.DirectionalLight(0xffffff, 3.0);
scene.add(ambientLight);

// move the light back and up a bit
mainLight.position.set(5, 5, 5);

const color = 0xff0000;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(5, 5, 5);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);



// remember to add the light to the scene
//scene.add(ambientLight, mainLight);

gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 2, 0.01);
gui.add(light.target.position, 'x', -10, 10);
gui.add(light.target.position, 'z', -10, 10);
gui.add(light.target.position, 'y', 0, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.gammaOutput = true;
renderer.physicallyCorrectLights = true;

const controls = new OrbitControls(camera, canvas)

controls.target.set(3.5, 3.5, 3.5);


// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //mesh.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()