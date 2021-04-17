import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { defaultScrollUserParam, ScrollUserParam } from './scroll-param';
import { ScrollService } from './scroll.service';

@Component({
  selector: 'jz-scroll',
  template: `<jz-scene
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-scroll-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    ></jz-scroll-param>
  </jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollComponent {
  userParam = { ...defaultScrollUserParam } as ScrollUserParam;
  constructor(
    public drawService: ScrollService,
    public controlService: SceneControlService
  ) {}
}
