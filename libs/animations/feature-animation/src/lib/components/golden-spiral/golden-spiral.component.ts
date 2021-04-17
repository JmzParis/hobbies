import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import {
  defaultGoldenSpiralUserParam,
  GoldenSpiralUserParam,
} from './golden-spiral-param';
import { GoldenSpiralService } from './golden-spiral.service';

@Component({
  selector: 'jz-golden-spiral',
  template: `<jz-scene
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-golden-spiral-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    >
    </jz-golden-spiral-param>
  </jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoldenSpiralComponent {
  userParam = { ...defaultGoldenSpiralUserParam } as GoldenSpiralUserParam;
  constructor(
    public drawService: GoldenSpiralService,
    public controlService: SceneControlService
  ) {}
}
