import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { defaultTubeUserParam, TubeUserParam } from './tube-param';
import { TubeService } from './tube.service';

@Component({
  selector: 'jz-tube',
  template: `<jz-scene3d
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-tube-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    ></jz-tube-param>
  </jz-scene3d>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TubeComponent {
  userParam = { ...defaultTubeUserParam } as TubeUserParam;
  constructor(
    public drawService: TubeService,
    public controlService: SceneControlService
  ) {}
}
