import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  defaultGoldenSpiralUserParam,
  GoldenSpiralUserParam,
} from './golden-spiral-param';
import { GoldenSpiralService } from './golden-spiral.service';

@Component({
  selector: 'jz-golden-spiral',
  template: `<ng-template #userParamTpl>
      <jz-golden-spiral-param [userParam]="userParam"></jz-golden-spiral-param>
    </ng-template>
    <jz-scene
      [paramTemplate]="userParamTpl"
      [userParam]="userParam"
      [drawService]="drawService"
    ></jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoldenSpiralComponent {
  userParam = { ...defaultGoldenSpiralUserParam } as GoldenSpiralUserParam;
  constructor(public drawService: GoldenSpiralService) {}
}
