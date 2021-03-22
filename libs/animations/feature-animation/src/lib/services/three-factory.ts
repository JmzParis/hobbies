import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function buildRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // transparent background
    antialias: true, // smooth edges
  });

  renderer.setSize(canvas.width, canvas.height);
  return renderer;
}

export function createOrbitControls(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement):void{
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 1.2;
  controls.maxDistance = 4;
  controls.update();
}

export function buildGridHelper(): THREE.GridHelper {
  const grid = new THREE.GridHelper(30, 30, 0xffffff, 0x404040);
  grid.rotation.x = Math.PI * 0.5;
  return grid;
}

export const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  opacity: 0.3,
  wireframe: true,
  transparent: true,
});

export const goldMaterial = new THREE.MeshPhongMaterial({
  color: 0xff8800,
  side: THREE.DoubleSide,
});

export const cyanMaterial = new THREE.MeshPhongMaterial({
  color: 0x0088ff88,
  side: THREE.DoubleSide,
});

export function buildMesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  wireframe = true
): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, material);
  if (wireframe) {
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    mesh.add(wireframe);
  }
  return mesh;
}

export function buildPerspectiveCamera(
  canvas: HTMLCanvasElement
): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    1000
  );
  
	//camera.position.set( 0, 150, 500 );
  camera.position.z = 20;

  const light = new THREE.PointLight(0xffffff, 0.85);
  camera.add(light);
  return camera;
}

export function buildScene(): THREE.Scene {
  const scene = new THREE.Scene();
  //this.scene.background = new THREE.Color(0x505050);
  scene.background = new THREE.Color(0x000000);
  scene.add(new THREE.AmbientLight(0x303030));
  return scene;
}

export function buildRibbon(
  curves: THREE.Curve<THREE.Vector3>[],
  segments: number
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const indices = [];
  const vertices = [];
  const widthSegments = curves.length;
  const lengthSegments = segments;

  // generate vertices, normals and color data for a simple grid geometry
  for (let i = 0; i < widthSegments; i++) {
    const curve = curves[i];
    for (let j = 0; j <= lengthSegments; j++) {
      const x = j / lengthSegments;
      const p = curve.getPoint(x);
      vertices.push(...p.toArray());
    }
  }

  // generate indices (data for element array buffer)
  for (let i = 0; i < widthSegments - 1; i++) {
    for (let j = 0; j < lengthSegments; j++) {
      const a = i * (lengthSegments + 1) + (j + 1);
      const b = i * (lengthSegments + 1) + j;
      const c = (i + 1) * (lengthSegments + 1) + j;
      const d = (i + 1) * (lengthSegments + 1) + (j + 1);

      // generate two faces (triangles) per iteration
      indices.push(a, b, d); // face one
      indices.push(b, c, d); // face two
    }
  }

  geometry.setIndex(indices);
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.computeVertexNormals();
  return geometry;
}
