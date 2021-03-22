import { Injectable } from '@angular/core';
import { Draw3dService } from '../../services/scene-model';

import * as THREE from 'three';
import { TorusParam, TorusUserParam } from './torus-param';
import { Scene3dService } from '../../services/three-shared';
import {
  buildMesh,
  goldMaterial,
  cyanMaterial,
  buildRibbon,
} from '../../services/three-factory';

class TorusCurve extends THREE.Curve<THREE.Vector3> {
  constructor(public scale = 1, private userParam: TorusUserParam) {
    super();
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()): THREE.Vector3 {
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
export class TorusService extends Scene3dService implements Draw3dService {
  userParam!: TorusUserParam;

  public init(fullParam: TorusParam): void {
    this.userParam = fullParam.userParam as TorusUserParam;
    this.createScene(fullParam);
    this.populateSceneGroup();
  }

  public restart(fullParam: TorusParam): void {
    this.populateSceneGroup();
  }

  public draw(delay: number, fullParam: TorusParam): void {
    this.userParam = fullParam.userParam as TorusUserParam;
    super.draw(delay, fullParam);
  }

  protected populateSceneGroup() {
    super.populateSceneGroup();
    if (this.userParam.tube) this.setTorusTube(this.group);
    else this.setTorusRibbons(this.group);

    this.setScale(this.userParam.scale);
  }

  private setTorusRibbons(group: THREE.Group) {
    const up = this.userParam;
    const a = (2 * Math.PI) / 200;

    const spline1 = new TorusCurve(2, { ...up, phi: 0 });
    const spline2 = new TorusCurve(2, { ...up, phi: a });
    const ribbonGeometry1 = buildRibbon([spline1, spline2], up.segments);
    super.addGeometryForLaterDisposal(ribbonGeometry1);
    group.add(buildMesh(ribbonGeometry1, goldMaterial, up.wireframe));

    const spline3 = new TorusCurve(2, { ...up, phi: 1.5 * a });
    const spline4 = new TorusCurve(2, { ...up, phi: 2.5 * a });
    const ribbonGeometry2 = buildRibbon([spline3, spline4], up.segments);
    super.addGeometryForLaterDisposal(ribbonGeometry2);
    const cyanMat = cyanMaterial;
    cyanMat.blending = THREE.AdditiveBlending;
    group.add(buildMesh(ribbonGeometry2, cyanMat, up.wireframe));
  }

  private setTorusTube(group: THREE.Group): void {
    const up = this.userParam;
    const spline = new TorusCurve(2, up);
    const tubeGeometry = new THREE.TubeGeometry(
      spline,
      up.segments,
      up.radius,
      up.radialDivision,
      false
    );
    super.addGeometryForLaterDisposal(tubeGeometry);
    const mesh = buildMesh(tubeGeometry, goldMaterial, up.wireframe);
    group.add(mesh);
  }
}
