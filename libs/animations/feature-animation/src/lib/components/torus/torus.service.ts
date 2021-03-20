import { Injectable } from '@angular/core';
import { Draw3dService } from '../../services/scene-model';

import * as THREE from 'three';
import { TorusParam, TorusUserParam } from './torus-param';

class TorusCurve extends THREE.Curve<THREE.Vector3> {
  constructor(public scale = 1, private userParam: TorusUserParam) {
    super();
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()): THREE.Vector3 {
    const p = this.userParam;
    const tx =
      (p.r1 + p.r2 * Math.cos(p.s2 * 2 * Math.PI * t)) *
      Math.sin(p.s1 * 2 * Math.PI * t);
    const ty =
      (p.r1 + p.r2 * Math.cos(p.s2 * 2 * Math.PI * t)) *
      Math.cos(p.s1 * 2 * Math.PI * t);
    const tz = p.r2 * Math.sin(p.s2 * 2 * Math.PI * t);

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}

@Injectable({
  providedIn: 'root',
})
export class TorusService implements Draw3dService {
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private mesh!: THREE.Mesh;
  private material!: THREE.Material;
  private wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0.3,
    wireframe: true,
    transparent: true,
  });
  private userParam!: TorusUserParam;
  private spline!: TorusCurve;

  public init(fullParam: TorusParam): void {
    this.createScene(fullParam);
  }

  public restart(fullParam: TorusParam): void {
    this.setTube();
  }

  public draw(delay: number, fullParam: TorusParam): void {
    const userParam = fullParam.userParam as TorusUserParam;
    this.userParam = userParam;
    const rotationService = fullParam.sceneRotationService;
    
    this.mesh.rotation.y +=
      (rotationService.targetRotationx - this.scene.rotation.y) * 0.0005;
    this.mesh.rotation.x +=
      (rotationService.targetRotationy - this.scene.rotation.x) * 0.0005;
/*
    this.mesh.rotation.x += 0.008;
    this.mesh.rotation.y += 0.01;
    this.mesh.rotation.z += 0.005;
*/
    this.renderer.render(this.scene, this.camera);
  }

  public resize(fullParam: TorusParam): void {
    const canvas = fullParam.canvas;
    const width = canvas.width;
    const height = canvas.height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  private buildRenderer(fullParam: TorusParam): THREE.WebGLRenderer {
    const canvas = fullParam.canvas;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true, // transparent background
      antialias: true, // smooth edges
    });

    renderer.setSize(canvas.width, canvas.height);
    return renderer;
  }

  private setTube(): void {
    if (this.mesh !== undefined) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
    }

    const up = this.userParam;
    this.spline = new TorusCurve(2, up);
    
    const tubeGeometry = new THREE.TubeGeometry(
      this.spline,
      up.segments,
      up.radius,
      up.radialDivision,
      false
    );

    this.addGeometry(tubeGeometry);
    this.setScale();
  }

  private addGeometry(geometry: THREE.TubeGeometry): void {
    // 3D shape
    const mesh = new THREE.Mesh(geometry, this.material);
    const wireframe = new THREE.Mesh(geometry, this.wireframeMaterial);
    mesh.add(wireframe);
    this.mesh = mesh;
    this.scene.add(mesh);
  }

  private setScale(): void {
    const up = this.userParam;
    this.mesh.scale.set(up.scale, up.scale, up.scale);
  }

  private createScene(fullParam: TorusParam): void {
    const userParam = fullParam.userParam as TorusUserParam;
    this.userParam = userParam;

    const canvas = fullParam.canvas;
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0x505050);
    this.scene.background = new THREE.Color(0x000000);

    this.scene.add(new THREE.AmbientLight(0x303030));
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.width / canvas.height,
      0.1,
      1000
    );
    this.camera.position.z = 20;
    this.scene.add(this.camera);

    const light = new THREE.PointLight(0xffffff, 0.85);
    this.camera.add(light);

    this.renderer = this.buildRenderer(fullParam);

    //this.geometry = new THREE.TubeGeometry(this.path, 200, 1, 20, false);
    this.material = new THREE.MeshPhongMaterial({
      color: 0xff8800,
      side: THREE.DoubleSide,
    });
    //this.material.blending = THREE.AdditiveBlending;
    this.setTube();
    /*
    const mesh = new THREE.Mesh(this.geometry, material);
    this.mesh = mesh;
    this.scene.add(mesh);
    */
  }
}
