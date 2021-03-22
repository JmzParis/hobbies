import * as THREE from 'three';
import { BufferGeometry } from 'three';
import { Animation3dParam } from './scene-model';
import {
  buildGridHelper,
  buildPerspectiveCamera,
  buildRenderer,
  buildScene,
  createOrbitControls,
} from './three-factory';

export function threeResize(
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  const width = canvas.width;
  const height = canvas.height;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

export class Scene3dService {
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  protected group!: THREE.Group;
  private geometries = [] as BufferGeometry[];


  public draw(delay: number, fullParam: Animation3dParam): void {
    fullParam.sceneRotationService.rotate(this.group);
    this.renderer.render(this.scene, this.camera);
  }

  public resize(fullParam: Animation3dParam): void {
    threeResize(fullParam.canvas, this.camera, this.renderer);
  }

  protected setScale(scale: number): void {
    this.group.scale.set(scale, scale, scale);
  }

  protected createScene(fullParam: Animation3dParam): void {
    const canvas = fullParam.canvas;
    this.camera = buildPerspectiveCamera(canvas);
    this.scene = buildScene();
    //createOrbitControls(this.camera,canvas);
    //this.scene.add(buildGridHelper());
    this.scene.add(this.camera);
    this.renderer = buildRenderer(canvas);
  }

  private recreateGroup(): void {
    let r = undefined;
    if (this.group !== undefined) {
      r = this.group.rotation;
      this.scene.remove(this.group);
      this.geometries.map((g) => g.dispose());
      this.geometries = [];
    }
    const group = new THREE.Group();
    if (r !== undefined) {
      group.rotation.x = r.x;
      group.rotation.y = r.y;
      group.rotation.z = r.z;
    }
    this.group = group;
    this.scene.add(this.group);
  }

  protected populateSceneGroup(): void {
    this.recreateGroup();
  }

  protected addGeometryForLaterDisposal(geometry: BufferGeometry){
    this.geometries.push(geometry);
  }
}
