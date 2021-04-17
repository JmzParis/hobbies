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
import { TubeUserParam } from './tube-param';

@Component({
  selector: 'jz-tube-param',
  templateUrl: './tube-param.component.html',
  styleUrls: ['../../services/param.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: D_SCENE_PARAM_COMPONENT, useExisting: TubeParamComponent },
  ],
})
export class TubeParamComponent implements SceneParam {
  @Input() userParam!: TubeUserParam;
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
    p.rx = this.random(1, 7, 1);
    p.sx = this.random(-5, 5, 1);
    p.cx = this.random(-5, 5, 1);

    p.ry = this.random(1, 7, 1);
    p.sy = this.random(-5, 5, 1);
    p.cy = this.random(-5, 5, 1);

    p.rz = this.random(1, 7, 1);
    p.sz = this.random(-5, 5, 1);
    p.cz = this.random(-5, 5, 1);
    this.controlService.onRestart();
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
