import {
  AmbientLight,
  BufferGeometry,
  Group,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';
import { Animation3dParam, Draw3dService, UserParam } from './scene-model';
import {
  buildPerspectiveCamera,
  buildRenderer,
  buildScene,
} from './three-factory';

function threeResize(
  canvas: HTMLCanvasElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) {
  const width = canvas.width;
  const height = canvas.height;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

export class Scene3dBaseService implements Draw3dService {
  private fullParam!: Animation3dParam;
  private renderer!: WebGLRenderer;
  private camera!: PerspectiveCamera;
  private scene!: Scene;
  protected group!: Group;
  private geometries = [] as BufferGeometry[];

  public resize(fullParam: Animation3dParam): void {
    threeResize(fullParam.canvas, this.camera, this.renderer);
  }

  protected setScale(scale: number): void {
    this.group.scale.set(scale, scale, scale);
  }

  protected createScene(fullParam: Animation3dParam): void {
    const canvas = fullParam.canvas;
    this.camera = this.customizeCamera(buildPerspectiveCamera(canvas));
    this.scene = this.customizeScene(buildScene());
    //createOrbitControls(this.camera,canvas);
    //this.scene.add(buildGridHelper());
    this.scene.add(this.camera);

    this.renderer = buildRenderer(canvas);
  }

  protected customizeScene(scene: Scene): Scene {
    scene.add(new AmbientLight(0xa0a0a0));
    return scene;
  }

  protected customizeCamera(camera: PerspectiveCamera): PerspectiveCamera {
    //camera.position.set( 0, 150, 500 );
    camera.position.z = 20;
    const light = new PointLight(0xffffff, 0.85);
    camera.add(light);
    return camera;
  }

  private recreateGroup(): void {
    let r = undefined;
    if (this.group !== undefined) {
      r = this.group.rotation;
      this.scene.remove(this.group);
      this.geometries.map((g) => g.dispose());
      this.geometries = [];
    }
    const group = new Group();

    if (r !== undefined) group.rotation.set(r.x, r.y, r.z);

    this.group = group;
    this.scene.add(this.group);
  }

  protected addGeometryForLaterDisposal(geometry: BufferGeometry) {
    this.geometries.push(geometry);
  }

  public init(fullParam: Animation3dParam): void {
    this.fullParam = fullParam;
    this.createScene(fullParam);
    this.populateSceneGroup();
  }

  public restart(fullParam: Animation3dParam): void {
    this.fullParam = fullParam;
    this.populateSceneGroup();
  }

  public draw(delay: number, fullParam: Animation3dParam): void {
    this.fullParam = fullParam;
    fullParam.sceneRotationService.rotate(this.group);
    this.renderer.render(this.scene, this.camera);
  }

  protected populateSceneGroup(): void {
    this.recreateGroup();
    const userParam = this.fullParam.userParam;
    this.group.add(...this.buildSubject(userParam));
    this.setScale(userParam.scale);
  }

  protected buildSubject(up: UserParam): Object3D[] {
    return [];
  }
}
