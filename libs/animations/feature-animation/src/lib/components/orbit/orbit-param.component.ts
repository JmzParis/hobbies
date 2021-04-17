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

import { OrbitUserParam } from './orbit-param';

@Component({
  selector: 'jz-orbit-param',
  templateUrl: './orbit-param.component.html',
  styleUrls: ['../../services/param.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: D_SCENE_PARAM_COMPONENT, useExisting: OrbitParamComponent },
  ],
})
export class OrbitParamComponent implements SceneParam {
  @Input() userParam!: OrbitUserParam;
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
    // p.bgMode = this.random(0,7,1);
    p.corpsCount = this.random(2, 200, 1);
    p.maxMass = this.random(1, 40, 1);
    p.speedFactor = this.random(1, 80, 1);
    p.gravity = this.random(0.3, 0.5, 0.1);
    this.controlService.onRestart();
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
