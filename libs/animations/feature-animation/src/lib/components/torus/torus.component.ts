import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { defaultTorusUserParam, TorusUserParam } from './torus-param';
import { TorusService } from './torus.service';

@Component({
  selector: 'jz-torus',
  template: `<jz-scene3d
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-torus-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    ></jz-torus-param>
  </jz-scene3d>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TorusComponent {
  userParam = { ...defaultTorusUserParam } as TorusUserParam;
  constructor(
    public drawService: TorusService,
    public controlService: SceneControlService
  ) {}
}
