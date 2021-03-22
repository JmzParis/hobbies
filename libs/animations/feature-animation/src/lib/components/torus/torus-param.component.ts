import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  confBackgroundModes,
  confColorModes,
  confDrawings,
} from '../../services/scene-model';
import { TorusUserParam } from './torus-param';

@Component({
  selector: 'jz-torus-param',
  templateUrl: './torus-param.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TorusParamComponent {
  @Input() userParam!: TorusUserParam;
  colorModes = confColorModes;
  drawings = confDrawings;
  bgModes = confBackgroundModes;

  onRandom(): void {
    const p = this.userParam;
    p.r1 = this.random(1, 7, 1);
    p.s1 = this.random(1, 10, 1);
    p.r2 = this.random(1, 7, 1);
    p.s2 = this.random(1, 50, 1);
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
