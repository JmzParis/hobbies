import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defaultOrbitUserParam, OrbitUserParam } from './orbit-param';
import { OrbitService } from './orbit.service';

@Component({
  selector: 'jz-orbit',
  template: `<ng-template #userParamTpl>
      <jz-orbit-param [userParam]="userParam"></jz-orbit-param>
    </ng-template>
    <jz-scene
      [paramTemplate]="userParamTpl"
      [userParam]="userParam"
      [drawService]="drawService"
    ></jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrbitComponent {
  userParam = { ...defaultOrbitUserParam } as OrbitUserParam;
  constructor(public drawService: OrbitService) {}
}
