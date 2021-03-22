import { Injectable } from '@angular/core';
import { Draw3dService } from '../../services/scene-model';

import * as THREE from 'three';
import { TubeParam, TubeUserParam } from './tube-param';
import { Scene3dService } from '../../services/three-shared';
import { buildMesh, goldMaterial } from '../../services/three-factory';

class CustomCurve extends THREE.Curve<THREE.Vector3> {
  constructor(public scale = 1, private userParam: TubeUserParam) {
    super();
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()): THREE.Vector3 {
    const p = this.userParam;
    const tx =
      p.rx *
      Math.sin(p.sx * 2 * Math.PI * t) *
      Math.cos(p.cx * 2 * Math.PI * t);
    const ty =
      p.ry *
      Math.sin(p.sy * 2 * Math.PI * t) *
      Math.cos(p.cy * 2 * Math.PI * t);
    const tz =
      p.rz *
      Math.sin(p.sz * 2 * Math.PI * t) *
      Math.cos(p.cz * 2 * Math.PI * t);

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}

@Injectable({
  providedIn: 'root',
})
export class TubeService extends Scene3dService implements Draw3dService {
  private userParam!: TubeUserParam;

  public init(fullParam: TubeParam): void {
    this.userParam = fullParam.userParam as TubeUserParam;
    this.createScene(fullParam);
    this.populateSceneGroup();
  }

  public restart(fullParam: TubeParam): void {
    this.populateSceneGroup();
  }

  public draw(delay: number, fullParam: TubeParam): void {
    this.userParam = fullParam.userParam as TubeUserParam;
    super.draw(delay, fullParam);
  }

  protected populateSceneGroup(): void {
    super.populateSceneGroup();
    this.setTube(this.group);
    this.setScale(this.userParam.scale);
  }

  private setTube(group: THREE.Group) {
    const up = this.userParam;

    const spline = new CustomCurve(up.scale, up);
    const tubeGeometry = new THREE.TubeGeometry(
      spline,
      up.segments,
      up.radius,
      up.radialDivision,
      false
    );
    super.addGeometryForLaterDisposal(tubeGeometry);
    group.add(buildMesh(tubeGeometry, goldMaterial, up.wireframe));
  }
}
