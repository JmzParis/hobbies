import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  confBackgroundModes,
  confColorModes,
  confDrawings,
} from '../../services/scene-model';
import { TubeUserParam } from './tube-param';

@Component({
  selector: 'jz-tube-param',
  templateUrl: './tube-param.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TubeParamComponent {
  @Input() userParam!: TubeUserParam;
  colorModes = confColorModes;
  drawings = confDrawings;
  bgModes = confBackgroundModes;

  onRandom(): void {
    const p = this.userParam;
    p.rx = this.random(0, 7, 1);
    p.sx = this.random(-5, 5, 1);
    p.cx = this.random(-5, 5, 1);

    p.ry = this.random(0, 7, 1);
    p.sy = this.random(-5, 5, 1);
    p.cy = this.random(-5, 5, 1);

    p.rz = this.random(0, 7, 1);
    p.sz = this.random(-5, 5, 1);
    p.cz = this.random(-5, 5, 1);
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
