import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { defaultSwarmUserParam, SwarmUserParam } from './swarm-param';
import { SwarmService } from './swarm.service';

@Component({
  selector: 'jz-swarm',
  template: `<jz-scene
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-swarm-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    ></jz-swarm-param>
  </jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwarmComponent {
  userParam = { ...defaultSwarmUserParam } as SwarmUserParam;
  constructor(
    public drawService: SwarmService,
    public controlService: SceneControlService
  ) {}
}
