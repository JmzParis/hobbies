import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defaultSwarmUserParam, SwarmUserParam } from './swarm-param';
import { SwarmService } from './swarm.service';

@Component({
  selector: 'jz-swarm',
  template: `<ng-template #userParamTpl>
  <jz-swarm-param [userParam]="userParam"></jz-swarm-param>
</ng-template>
<jz-scene
  [paramTemplate]="userParamTpl"
  [userParam]="userParam"
  [drawService]="drawService"
></jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwarmComponent {
  userParam = { ...defaultSwarmUserParam } as SwarmUserParam;
  constructor(public drawService: SwarmService) {}
}
