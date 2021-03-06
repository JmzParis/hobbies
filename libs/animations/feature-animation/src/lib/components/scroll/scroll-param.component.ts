import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  confBackgroundModes,
  confColorModes,
  confDrawings,
} from '../../services/scene-param';

import { ScrollUserParam } from './scroll-param';

@Component({
  selector: 'jz-scroll-param',
  templateUrl: './scroll-param.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollParamComponent {
  @Input() userParam!: ScrollUserParam;
  colorModes = confColorModes;
  drawings = confDrawings;
  bgModes = confBackgroundModes;

  onRandom(): void {
    const p = this.userParam;
    p.imgBack = this.random(-1, 23, 1);
    p.backHorizSpeed = this.random(-12, 12, 0.2);
    p.backVertSpeed = this.random(-12, 12, 0.2);
    p.imgFront = this.random(-1, 23, 1);
    p.frontHorizSpeed = this.random(-12, 12, 0.2);
    p.frontVertSpeed = this.random(-12, 12, 0.2);   
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
