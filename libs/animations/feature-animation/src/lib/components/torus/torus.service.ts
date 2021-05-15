import { Injectable } from '@angular/core';
import { UserParam } from '../../services/scene-model';
import { TorusUserParam } from './torus-param';
import { Scene3dBaseService } from '../../services/three-shared';
import {
  buildMesh,
  goldMaterial,
  cyanMaterial,
  buildRibbon,
} from '../../services/three-factory';
import {
  AdditiveBlending,
  Curve,
  Object3D,
  TubeGeometry,
  Vector3,
} from 'three';

class TorusCurve extends Curve<Vector3> {
  constructor(public scale = 1, private userParam: TorusUserParam) {
    super();
  }

  getPoint(t: number, optionalTarget = new Vector3()): Vector3 {
    const p = this.userParam;
    const theta2 = p.s2 * 2 * Math.PI * t;
    const theta1 = p.phi + p.s1 * 2 * Math.PI * t;
    const cosTheta2 = Math.cos(theta2);
    const r = p.r1 + p.r2 * cosTheta2;
    const tx = r * Math.sin(theta1);
    const ty = r * Math.cos(theta1);
    const tz = p.r2 * Math.sin(theta2);

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}

@Injectable({
  providedIn: 'root',
})
export class TorusService extends Scene3dBaseService {
  protected buildSubject(up: UserParam): Object3D[] {
    const tup = up as TorusUserParam;
    return tup.tube ? this.buildTorusTube(tup) : this.buildTorusRibbons(tup);
  }

  private buildTorusRibbons(up: TorusUserParam): Object3D[] {
    const meshes = [] as Object3D[];
    const a = (2 * Math.PI) / 200;
    const spline1 = new TorusCurve(2, { ...up, phi: 0 });
    const spline2 = new TorusCurve(2, { ...up, phi: a });
    const ribbonGeometry1 = buildRibbon([spline1, spline2], up.segments);
    super.addGeometryForLaterDisposal(ribbonGeometry1);
    meshes.push(buildMesh(ribbonGeometry1, goldMaterial, up.wireframe));

    const spline3 = new TorusCurve(2, { ...up, phi: 1.5 * a });
    const spline4 = new TorusCurve(2, { ...up, phi: 2.5 * a });
    const ribbonGeometry2 = buildRibbon([spline3, spline4], up.segments);
    super.addGeometryForLaterDisposal(ribbonGeometry2);
    const cyanMat = cyanMaterial;
    cyanMat.blending = AdditiveBlending;
    meshes.push(buildMesh(ribbonGeometry2, cyanMat, up.wireframe));
    return meshes;
  }

  private buildTorusTube(up: TorusUserParam): Object3D[] {
    const spline = new TorusCurve(2, up);
    const tubeGeometry = new TubeGeometry(
      spline,
      up.segments,
      up.radius,
      up.radialDivision,
      false
    );
    super.addGeometryForLaterDisposal(tubeGeometry);
    return [buildMesh(tubeGeometry, goldMaterial, up.wireframe)];
  }
}
