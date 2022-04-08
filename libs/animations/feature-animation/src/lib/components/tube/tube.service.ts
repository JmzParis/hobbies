import { Injectable } from '@angular/core';

import { Scene3dBaseService } from '../../services/three-shared';
import { UserParam } from '../../services/scene-model';
import { TubeUserParam } from './tube-param';

import { buildMesh, goldMaterial } from '../../services/three-factory';
import { Curve, Object3D, TubeGeometry, Vector3 } from 'three';

class CustomCurve extends Curve<Vector3> {
  constructor(public scale = 1, private userParam: TubeUserParam) {
    super();
  }

  override getPoint(t: number, optionalTarget = new Vector3()): Vector3 {
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
export class TubeService extends Scene3dBaseService {
  protected override buildSubject(up: UserParam): Object3D[] {
    const tup = up as TubeUserParam;
    const spline = new CustomCurve(tup.scale, tup);
    const tubeGeometry = new TubeGeometry(
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
