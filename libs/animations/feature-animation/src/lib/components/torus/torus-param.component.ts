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
import { TorusUserParam } from './torus-param';

@Component({
  selector: 'jz-torus-param',
  templateUrl: './torus-param.component.html',
  styleUrls: ['../../services/param.scss'],
  styles: ['.space-evenly{display: flex; justify-content: space-evenly;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: D_SCENE_PARAM_COMPONENT, useExisting: TorusParamComponent },
  ],
})
export class TorusParamComponent implements SceneParam {
  @Input() userParam!: TorusUserParam;
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
    p.r1 = this.random(1, 7, 1);
    p.s1 = this.random(1, 10, 1);
    p.r2 = this.random(1, 7, 1);
    p.s2 = this.random(1, 50, 1);
    this.controlService.onRestart();
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
