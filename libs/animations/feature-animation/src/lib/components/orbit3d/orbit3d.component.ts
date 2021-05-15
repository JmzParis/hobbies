import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { defaultOrbit3dUserParam, Orbit3dUserParam } from './orbit3d-param';
import { Orbit3dService } from './orbit3d.service';

@Component({
  selector: 'jz-orbit3d',
  template: `<jz-scene3d
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-orbit3d-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    ></jz-orbit3d-param>
  </jz-scene3d>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Orbit3dComponent {
  userParam = { ...defaultOrbit3dUserParam } as Orbit3dUserParam;
  constructor(
    public drawService: Orbit3dService,
    public controlService: SceneControlService
  ) {}
}
