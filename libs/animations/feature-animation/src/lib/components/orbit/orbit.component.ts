import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { defaultOrbitUserParam, OrbitUserParam } from './orbit-param';
import { OrbitService } from './orbit.service';

@Component({
  selector: 'jz-orbit',
  template: `<jz-scene
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-orbit-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    ></jz-orbit-param>
  </jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrbitComponent {
  userParam = { ...defaultOrbitUserParam } as OrbitUserParam;
  constructor(
    public drawService: OrbitService,
    public controlService: SceneControlService
  ) {}
}
