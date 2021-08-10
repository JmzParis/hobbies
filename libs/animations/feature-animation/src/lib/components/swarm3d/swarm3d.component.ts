import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { defaultSwarm3dUserParam, Swarm3dUserParam } from './swarm3d-param';
import { Swarm3dService } from './swarm3d.service';

@Component({
  selector: 'jz-swarm3d',
  template: `<jz-scene3d
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-swarm3d-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    ></jz-swarm3d-param>
  </jz-scene3d>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Swarm3dComponent {
  userParam = { ...defaultSwarm3dUserParam } as Swarm3dUserParam;
  constructor(
    public drawService: Swarm3dService,
    public controlService: SceneControlService
  ) {}
}
