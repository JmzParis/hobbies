import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defaultScrollUserParam, ScrollUserParam } from './scroll-param';
import { ScrollService } from './scroll.service';

@Component({
  selector: 'jz-scroll',
  template: `<ng-template #userParamTpl>
  <jz-scroll-param [userParam]="userParam"></jz-scroll-param>
</ng-template>
<jz-scene
  [paramTemplate]="userParamTpl"
  [userParam]="userParam"
  [drawService]="drawService"
></jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollComponent {
  userParam = { ...defaultScrollUserParam } as ScrollUserParam;
  constructor(public drawService: ScrollService) {}
}
