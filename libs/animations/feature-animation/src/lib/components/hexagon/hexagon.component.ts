import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { defaultHexagonUserParam, HexagonUserParam } from './hexagon-param';
import { HexagonService } from './hexagon.service';

@Component({
  selector: 'jz-hexagon',
  template: `<jz-scene3d
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-hexagon-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    ></jz-hexagon-param>
  </jz-scene3d>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HexagonComponent {
  userParam = { ...defaultHexagonUserParam } as HexagonUserParam;
  constructor(
    public drawService: HexagonService,
    public controlService: SceneControlService
  ) {}
}
