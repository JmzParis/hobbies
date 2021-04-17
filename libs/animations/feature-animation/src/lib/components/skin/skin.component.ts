import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SceneControlService } from '../../services/scene-control.service';
import { defaultSkinUserParam, SkinUserParam } from './skin-param';
import { SkinService } from './skin.service';

@Component({
  selector: 'jz-skin',
  template: `<jz-scene
    [userParam]="userParam"
    [drawService]="drawService"
    [controlService]="controlService"
  >
    <jz-skin-param
      jzParam
      [userParam]="userParam"
      [controlService]="controlService"
    ></jz-skin-param>
  </jz-scene>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkinComponent {
  userParam = { ...defaultSkinUserParam } as SkinUserParam;
  constructor(
    public drawService: SkinService,
    public controlService: SceneControlService
  ) {}
}
