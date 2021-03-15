import { Injectable } from '@angular/core';
import { Draw3dService } from '../../services/scene-model';
import { HexagonParam, HexagonUserParam } from './hexagon-param';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class CubeService implements Draw3dService {
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;

  private cube!: THREE.Mesh;

  public init(fullParam: HexagonParam): void {
    this.createScene(fullParam);
  }

  public restart(fullParam: HexagonParam): void {
    this.init(fullParam);
  }

  public draw(delay: number, fullParam: HexagonParam): void {
    const hexagonUserParam = fullParam.userParam as HexagonUserParam;

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  public createScene(fullParam: HexagonParam): void {
    const canvas = fullParam.canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });
    this.renderer.setSize(canvas.width, canvas.height);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // soft white light
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  public resize(fullParam: HexagonParam): void {
    const canvas = fullParam.canvas;
    const width = canvas.width;
    const height = canvas.height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
