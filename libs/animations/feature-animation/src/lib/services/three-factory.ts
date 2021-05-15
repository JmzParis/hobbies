import {
  AmbientLight,
  BufferGeometry,
  Color,
  Curve,
  DoubleSide,
  Float32BufferAttribute,
  GridHelper,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function buildRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
  const renderer = new WebGLRenderer({
    canvas: canvas,
    alpha: true, // transparent background
    antialias: true, // smooth edges
  });

  renderer.setSize(canvas.width, canvas.height);
  return renderer;
}

export function createOrbitControls(
  camera: PerspectiveCamera,
  canvas: HTMLCanvasElement
): void {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 1.2;
  controls.maxDistance = 4;
  controls.update();
}

export function buildGridHelper(): GridHelper {
  const grid = new GridHelper(30, 30, 0xffffff, 0x404040);
  grid.rotation.x = Math.PI * 0.5;
  return grid;
}

export const wireframeMaterial = new MeshBasicMaterial({
  color: 0x000000,
  opacity: 0.3,
  wireframe: true,
  transparent: true,
});

export const goldMaterial = new MeshPhongMaterial({
  color: 0xff8800,
  side: DoubleSide,
});

export const cyanMaterial = new MeshPhongMaterial({
  color: 0x0088ff88,
  side: DoubleSide,
});

export function buildMesh(
  geometry: BufferGeometry,
  material: Material,
  wireframe = true
): Mesh {
  const mesh = new Mesh(geometry, material);
  if (wireframe) {
    const wireframe = new Mesh(geometry, wireframeMaterial);
    mesh.add(wireframe);
  }
  return mesh;
}

export function buildPerspectiveCamera(
  canvas: HTMLCanvasElement
): PerspectiveCamera {
  const camera = new PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    1000
  );

  return camera;
}

export function buildScene(): Scene {
  const scene = new Scene();
  //this.scene.background = new THREE.Color(0x505050);
  scene.background = new Color(0x000000);
  //scene.add(new AmbientLight(0x303030));
  //scene.add(new AmbientLight(0xa0a0a0));
  //const light = new PointLight(0xffffff, 1.5);
  //light.position.set(0, 0, 0);
  //scene.add(light);
  //scene.add(new AmbientLight(0xfff000));
  return scene;
}

export function buildRibbon(
  curves: Curve<Vector3>[],
  segments: number
): BufferGeometry {
  const geometry = new BufferGeometry();
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
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}
