import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  confBackgroundModes,
  confColorModes,
  confDrawings,
} from '../../services/scene-param';

import { OrbitUserParam } from './orbit-param';

@Component({
  selector: 'jz-orbit-param',
  templateUrl: './orbit-param.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrbitParamComponent {
  @Input() userParam!: OrbitUserParam;
  colorModes = confColorModes;
  drawings = confDrawings;
  bgModes = confBackgroundModes;

  onRandom(): void {
    const p = this.userParam;
    // p.bgMode = this.random(0,7,1);
    p.corpsCount = this.random(2, 200, 1);
    p.maxMass = this.random(1, 40, 1);
    p.speedFactor = this.random(1, 80, 1);
    p.gravity = this.random(0.3, 0.5, 0.1);
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
