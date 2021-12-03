import * as THREE from "three";
import { rotateObject } from "./rotate";

const material = new THREE.MeshStandardMaterial({
  color: 0xff3333,
  flatShading: true,
});

export function box(position, geometrys, materials) {
  const group = new THREE.Group();

  const plane = new THREE.Mesh(geometrys.x, materials.x);
  const plane2 = new THREE.Mesh(geometrys.y, materials.y);
  const plane3 = new THREE.Mesh(geometrys.z, materials.z);

  plane.position.y = 0.5;
  plane.position.z = 0.5;

  plane2.position.y = 1;
  plane2.position.z = 0.5;
  plane2.position.x = 0.5;

  plane3.position.y = 0.5;
  plane3.position.z = 0;
  plane3.position.x = 0.5;

  rotateObject(plane, 0, 90, 0);
  rotateObject(plane2, 90, 0, 0);
  rotateObject(plane3, 0, 0, 90);

  group.add(plane);
  group.add(plane2);
  group.add(plane3);

  console.log(position);
  group.translateX(position.x);
  group.translateY(position.y);
  group.translateZ(position.z);

  return group;
}

function row(position, start, end, colors) {
  const geometrys = {
    x: new THREE.PlaneGeometry(1, 1),
    y: new THREE.PlaneGeometry(1, 1),
    z: new THREE.PlaneGeometry(1, 1),
  };

  const group = new THREE.Group();

  // function box(position, size, res, material, tinte)
  // box(position, geometrys, materials)
  for (let i = start; i < end; i++) {
    const materials = {
      x: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.x),
        flatShading: true,
        side: THREE.DoubleSide,
      }),
      y: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.y),
        flatShading: true,
        side: THREE.DoubleSide,
      }),
      z: new THREE.MeshStandardMaterial({
        color: new THREE.Color(colors.z),
        flatShading: true,
        side: THREE.DoubleSide,
      }),
    };

    const pos = new THREE.Vector3(position.x, position.y + i, position.z + i);
    const cube = box(pos, geometrys, materials);

    group.add(cube);
  }

  return group;
}

export function piramide(cant, colors) {
  const group = new THREE.Group();

  for (let i = 0; i < cant; i++) {
    const columna = row({ x: -i, y: 0, z: i }, 0, cant - i, colors);
    group.add(columna);
  }

  return group;
}
