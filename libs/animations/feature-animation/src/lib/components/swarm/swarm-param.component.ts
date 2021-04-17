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

import { SwarmUserParam } from './swarm-param';

@Component({
  selector: 'jz-swarm-param',
  templateUrl: './swarm-param.component.html',
  styleUrls: ['../../services/param.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: D_SCENE_PARAM_COMPONENT, useExisting: SwarmParamComponent },
  ],
})
export class SwarmParamComponent implements SceneParam {
  @Input() userParam!: SwarmUserParam;
  @Input() controlService!: SceneControlService;
  colorModes = confColorModes;
  drawings = confDrawings;
  bgModes = confBackgroundModes;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  onRefresh(): void {
    this.changeDetectorRef.markForCheck();
  }

  onRandom(): void {
    const p = this.userParam;
    p.familyCount = this.random(1, 8, 1);
    p.familySize = this.random(2, 200, 1);
    p.gravity = this.random(0.1, 1, 0.05);
    this.controlService.onRestart();
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
