import { ChangeDetectionStrategy, Component } from '@angular/core';
import { defaultSkinUserParam, SkinUserParam } from './skin-param';
import { SkinService } from './skin.service';

@Component({
  selector: 'jz-skin',
  template: `<ng-template #userParamTpl>
  <jz-skin-param [userParam]="userParam"></jz-skin-param>
</ng-template>
<jz-scene
  [paramTemplate]="userParamTpl"
  [userParam]="userParam"
  [drawService]="drawService"
></jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkinComponent {
  userParam = { ...defaultSkinUserParam } as SkinUserParam;
  constructor(public drawService: SkinService) {}
}
