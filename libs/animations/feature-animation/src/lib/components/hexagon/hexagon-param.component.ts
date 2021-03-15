import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  confBackgroundModes,
  confColorModes,
  confDrawings,
} from '../../services/scene-model';
import { HexagonUserParam } from './hexagon-param';

@Component({
  selector: 'jz-hexagon-param',
  templateUrl: './hexagon-param.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HexagonParamComponent {
  @Input() userParam!: HexagonUserParam;
  colorModes = confColorModes;
  drawings = confDrawings;
  bgModes = confBackgroundModes;

  onRandom(): void {
    const p = this.userParam;
    p.concentricHexaCount = this.random(0, 20, 1);
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
