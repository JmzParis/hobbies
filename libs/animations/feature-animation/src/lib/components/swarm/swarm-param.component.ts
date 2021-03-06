import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { confBackgroundModes, confColorModes, confDrawings } from '../../services/scene-param';

import { SwarmUserParam } from './swarm-param';

@Component({
  selector: 'jz-swarm-param',
  templateUrl: './swarm-param.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwarmParamComponent {
  @Input() userParam!: SwarmUserParam;
  colorModes = confColorModes;
  drawings = confDrawings;
  bgModes = confBackgroundModes;

  onRandom(): void {
    const p = this.userParam;
    p.familyCount = this.random(1, 8, 1);
    p.familySize = this.random(2, 200, 1);    
    p.gravity = this.random(0.1, 1, 0.05);
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
