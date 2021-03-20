import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { defaultTubeUserParam, TubeUserParam } from './tube-param';
import { TubeService } from './tube.service';


@Component({
  selector: 'jz-tube',
  template: `<ng-template #userParamTpl>
      <jz-tube-param [userParam]="userParam"></jz-tube-param>
    </ng-template>
    <jz-scene3d
      [paramTemplate]="userParamTpl"
      [userParam]="userParam"
      [drawService]="drawService"
    ></jz-scene3d>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TubeComponent {
  userParam = { ...defaultTubeUserParam } as TubeUserParam;
  constructor(public drawService: TubeService) {}
}
