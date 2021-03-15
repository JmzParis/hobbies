import { Injectable } from '@angular/core';
import { Draw3dService } from '../../services/scene-model';
import { HexagonParam, HexagonUserParam } from './hexagon-param';
import * as THREE from 'three';

const sin6 = Math.sin(Math.PI / 3.0);
const cos6 = Math.cos(Math.PI / 3.0);

@Injectable({
  providedIn: 'root',
})
export class HexagonService implements Draw3dService {
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private cube!: THREE.Mesh;
  private group!: THREE.Group;

  public init(fullParam: HexagonParam): void {
    this.createScene(fullParam);
  }

  public restart(fullParam: HexagonParam): void {
    this.init(fullParam);
  }

  public draw(delay: number, fullParam: HexagonParam): void {
    const rotationService = fullParam.sceneRotationService;
    this.group.rotation.y +=
      (rotationService.targetRotationy - this.group.rotation.y) * 0.05;
    this.group.rotation.x +=
      (rotationService.targetRotationx - this.group.rotation.x) * 0.05;

    this.cube.rotation.x += -0.06;
    this.renderer.render(this.scene, this.camera);
  }

  public resize(fullParam: HexagonParam): void {
    const canvas = fullParam.canvas;
    const width = canvas.width;
    const height = canvas.height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  private buildRenderer(fullParam: HexagonParam): THREE.WebGLRenderer {
    const canvas = fullParam.canvas;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });

    renderer.setSize(canvas.width, canvas.height);
    return renderer;
  }

  private createScene(fullParam: HexagonParam): void {
    const userParam = fullParam.userParam as HexagonUserParam;
    const canvas = fullParam.canvas;
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0x505050);
    this.scene.background = new THREE.Color(0x000000);
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    const light = new THREE.PointLight(0xffffff, 0.8);
    this.camera.add(light);

    this.renderer = this.buildRenderer(fullParam);

    const extrudeSettings = {
      depth: 0.01,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.02,
    };
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //const material = new THREE.MeshBasicMaterial({ color: 0xe0fa00 });
    const material = new THREE.MeshPhongMaterial({
      color: 0xff8800,
      side: THREE.DoubleSide,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.scale.set(0.5, 0.5, 0.5);
    // this.scene.add(this.cube);

    const cx = 0;
    const cy = 0;
    let r = 0.4;

    const hexagonShape = this.buildHexagonShape(cx, cy, r);

    // const hexagonGeometry = new THREE.ShapeBufferGeometry( hexagonShape );
    const hexagonGeometry = new THREE.ExtrudeBufferGeometry(
      hexagonShape,
      extrudeSettings
    );
    const mesh = new THREE.Mesh(hexagonGeometry, material);
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);

    this.group = new THREE.Group();
    // this.group.position.y = 50;
    r = 0.5;
    this.pavage63(this.group, mesh, r, userParam.concentricHexaCount);

    this.group.add(this.cube);
    this.scene.add(this.group);
  }

  private pavage63(group: THREE.Group, mesh: THREE.Mesh, r: number, n: number) {
    const xd = r * (1 + cos6);
    const yd = 2 * r * sin6;
    for (let i = -n; i <= n; i++) {
      const shift = (i % 2) * sin6 * r;
      for (let j = -n; j <= n; j++) {
        const clone = mesh.clone();
        clone.position.set(i * xd, j * yd + shift, 0);
        group.add(clone);
      }
    }
  }
  
  private buildHexagonShape(x: number, y: number, r: number): THREE.Shape {
    return new THREE.Shape()
      .moveTo(x - r * cos6, y + r * sin6)
      .lineTo(x + r * cos6, y + r * sin6)
      .lineTo(x + r, y)
      .lineTo(x + r * cos6, y - r * sin6)
      .lineTo(x - r * cos6, y - r * sin6)
      .lineTo(x - r, y)
      .lineTo(x - r * cos6, y + r * sin6);
  }

}
