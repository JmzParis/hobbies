import { Injectable } from '@angular/core';

import { Scene3dService } from '../../services/three-shared';
import { UserParam } from '../../services/scene-model';
import { TubeUserParam } from './tube-param';

import * as THREE from 'three';
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
export class TubeService extends Scene3dService {
  protected buildSubject(up: UserParam): THREE.Object3D[]{
    const tup = up as TubeUserParam;
    const spline = new CustomCurve(tup.scale, tup);
    const tubeGeometry = new THREE.TubeGeometry(
      spline,
      tup.segments,
      tup.radius,
      tup.radialDivision,
      false
    );
    super.addGeometryForLaterDisposal(tubeGeometry);
    return [buildMesh(tubeGeometry, goldMaterial, tup.wireframe)];
  }
}
