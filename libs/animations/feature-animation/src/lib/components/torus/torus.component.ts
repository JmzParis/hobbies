import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { defaultTorusUserParam, TorusUserParam } from './torus-param';
import { TorusService } from './torus.service';


@Component({
  selector: 'jz-torus',
  template: `<ng-template #userParamTpl>
      <jz-torus-param [userParam]="userParam"></jz-torus-param>
    </ng-template>
    <jz-scene3d
      [paramTemplate]="userParamTpl"
      [userParam]="userParam"
      [drawService]="drawService"
    ></jz-scene3d>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TorusComponent {
  userParam = { ...defaultTorusUserParam } as TorusUserParam;
  constructor(public drawService: TorusService) {}
}
