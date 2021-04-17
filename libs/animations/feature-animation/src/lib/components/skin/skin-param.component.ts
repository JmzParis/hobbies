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
import { SkinUserParam } from './skin-param';

@Component({
  selector: 'jz-skin-param',
  templateUrl: './skin-param.component.html',
  styleUrls: ['../../services/param.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: D_SCENE_PARAM_COMPONENT, useExisting: SkinParamComponent },
  ],
})
export class SkinParamComponent implements SceneParam {
  @Input() userParam!: SkinUserParam;
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
    p.radiusThreshold = this.random(10, 200, 10);
    p.dragIntensity = this.random(0, 50, 5);
    p.repulsionIntensity = this.random(0, 2, 0.1);
    p.repulsionZone = this.random(1, 50, 1);
    p.spotCount = this.random(20, 200, 10);
    p.ageThreshold = this.random(10, 210, 20);
    this.controlService.onRestart();
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
