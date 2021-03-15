import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { defaultOrbitUserParam } from '../orbit/orbit-param';
import { HexagonUserParam } from './hexagon-param';
import { HexagonService } from './hexagon.service';

@Component({
  selector: 'jz-hexagon',
  template: `<ng-template #userParamTpl>
      <jz-hexagon-param [userParam]="userParam"></jz-hexagon-param>
    </ng-template>
    <jz-scene3d
      [paramTemplate]="userParamTpl"
      [userParam]="userParam"
      [drawService]="drawService"
    ></jz-scene3d>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HexagonComponent {
  userParam = { ...defaultOrbitUserParam } as HexagonUserParam;
  constructor(public drawService: HexagonService) {}
}