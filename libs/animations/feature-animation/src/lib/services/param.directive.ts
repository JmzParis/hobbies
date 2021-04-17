import { Directive, Inject, InjectionToken, Optional } from '@angular/core';
import { SceneControlService } from './scene-control.service';

// Setup:
// Param component will implement the SceneParam interface
// and will harbor the jzParam atribute in the Scene template
// providers: [{ provide: D_SCENE_PARAM_COMPONENT, useExisting: TubeParamComponent }]
// With all these:
//  - using jzParam attribute the scene <ng-content select="[jzParam]" css selector will work
//  - and in the Scene component code, the @ContentChild(ParamDirective) will retrive the directive
//  - in this directive the host (SceneParam) component is injected in the constructor
//  - the directive could then be used to call the host component methods (or data)
export const D_SCENE_PARAM_COMPONENT = new InjectionToken<SceneParam>(
  'D_SCENE_PARAM_COMPONENT'
);

export interface SceneParam {
  onRandom(): void;
  onRefresh(): void;
  sceneControlService?: SceneControlService;
}

@Directive({ selector: '[jzParam]' })
export class ParamDirective implements SceneParam {
  constructor(
    @Optional()
    @Inject(D_SCENE_PARAM_COMPONENT)
    private readonly component: SceneParam | null
  ) {}

  onRefresh(): void {
    if (this.component) this.component.onRefresh();
  }

  onRandom(): void {
    if (this.component) this.component.onRandom();
  }
}
