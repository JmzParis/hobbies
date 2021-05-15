import { Injectable } from '@angular/core';
import { HexagonUserParam } from './hexagon-param';
import * as THREE from 'three';
import { Scene3dBaseService } from '../../services/three-shared';
import { Animation3dParam, UserParam } from '../../services/scene-model';
import {
  BoxGeometry,
  ExtrudeBufferGeometry,
  Group,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PerspectiveCamera,
  PointLight,
} from 'three';

const sin6 = Math.sin(Math.PI / 3.0);
const cos6 = Math.cos(Math.PI / 3.0);

@Injectable({
  providedIn: 'root',
})
export class HexagonService extends Scene3dBaseService {
  cube!: Mesh<BoxGeometry, MeshPhongMaterial>;

  protected buildSubject(up: UserParam): Object3D[] {
    const hup = up as HexagonUserParam;
    return this.buildHexagons(hup);
  }

  private buildHexagons(hup: HexagonUserParam): Object3D[] {
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
    const cube = new Mesh(geometry, material);
    cube.scale.set(0.5, 0.5, 0.5);
    this.cube = cube;

    const cx = 0;
    const cy = 0;
    let r = 0.4;

    const hexagonShape = this.buildHexagonShape(cx, cy, r);

    // const hexagonGeometry = new THREE.ShapeBufferGeometry( hexagonShape );
    const hexagonGeometry = new ExtrudeBufferGeometry(
      hexagonShape,
      extrudeSettings
    );
    const mesh = new Mesh(hexagonGeometry, material);
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);

    const group = new Group();
    // this.group.position.y = 50;
    r = 0.5;
    this.pavage63(group, mesh, r, hup.concentricHexaCount);

    return [group, cube];
  }

  public draw(delay: number, fullParam: Animation3dParam): void {
    super.draw(delay, fullParam);
    this.cube.rotation.x += -0.06;
  }

  protected customizeCamera(camera: PerspectiveCamera): PerspectiveCamera {
    const light = new PointLight(0xffffff, 0.8);
    camera.add(light);
    camera.position.z = 5;
    return camera;
  }

  /*
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
*/
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
