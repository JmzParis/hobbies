import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import {
  D_SCENE_PARAM_COMPONENT,
  SceneParam,
} from '../../services/param.directive';
import { SceneControlService } from '../../services/scene-control.service';
import {
  confBackgroundModes,
  confColorModes,
  confDrawings,
} from '../../services/scene-model';

import { Orbit3dUserParam } from './orbit3d-param';

@Component({
  selector: 'jz-orbit3d-param',
  templateUrl: './orbit3d-param.component.html',
  styleUrls: ['../../services/param.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: D_SCENE_PARAM_COMPONENT, useExisting: Orbit3dParamComponent },
  ],
})
export class Orbit3dParamComponent implements SceneParam {
  @Input() userParam!: Orbit3dUserParam;
  @Input() controlService!: SceneControlService;
  readonly colorModes = confColorModes;
  readonly drawings = confDrawings;
  readonly bgModes = confBackgroundModes;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  onRefresh(): void {
    this.changeDetectorRef.markForCheck();
  }

  onRandom(): void {
    const p = this.userParam;

    p.corpsCount = this.random(2, 200, 1);
    p.zSpread = this.random(0, 20, 1);
    p.radiusMin = this.random(1, 10, 1);
    p.radiusMax = p.radiusMin + this.random(1, 12 - p.radiusMin, 1);
    p.maxMass = this.random(1, 40, 1);

    this.controlService.onRestart();
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
