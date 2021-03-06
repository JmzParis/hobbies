import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GoldenDoubleSpiralService } from './golden-doublespiral.service';
import {
  defaultGoldenSpiralUserParam,
  GoldenSpiralUserParam,
} from './golden-spiral-param';

@Component({
  selector: 'jz-golden-double-spiral',
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
export class GoldenDoubleSpiralComponent {
  userParam = { ...defaultGoldenSpiralUserParam } as GoldenSpiralUserParam;
  constructor(public drawService: GoldenDoubleSpiralService) {}
}
