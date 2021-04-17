import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { GoldenDoubleSpiralService } from './golden-doublespiral.service';
import {
  defaultGoldenSpiralUserParam,
  GoldenSpiralUserParam,
} from './golden-spiral-param';

@Component({
  selector: 'jz-golden-double-spiral',
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
export class GoldenDoubleSpiralComponent {
  userParam = { ...defaultGoldenSpiralUserParam } as GoldenSpiralUserParam;
  constructor(
    public drawService: GoldenDoubleSpiralService,
    public controlService: SceneControlService
  ) {}
}
