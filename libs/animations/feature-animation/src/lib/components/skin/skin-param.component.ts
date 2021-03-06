import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { confBackgroundModes, confColorModes, confDrawings } from '../../services/scene-param';
import { SkinUserParam } from './skin-param';

@Component({
  selector: 'jz-skin-param',
  templateUrl: './skin-param.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkinParamComponent {
  @Input() userParam!: SkinUserParam;
  colorModes = confColorModes;
  drawings = confDrawings;
  bgModes = confBackgroundModes;

  onRandom(): void {
    const p = this.userParam;
    p.radiusThreshold = this.random(10, 200, 10);
    p.dragIntensity = this.random(0, 50, 5);
    p.repulsionIntensity = this.random(0, 2, 0.1);
    p.repulsionZone = this.random(1, 50, 1);
    p.spotCount = this.random(20, 200, 10);
    p.ageThreshold = this.random(10, 210, 20);
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
