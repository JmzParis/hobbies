import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { confColorModes, confDrawings } from '../../services/scene-param';
import { GoldenSpiralUserParam } from './golden-spiral-param';

@Component({
  selector: 'jz-golden-spiral-param',
  templateUrl: './golden-spiral-param.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoldenSpiralParamComponent {
  @Input() userParam!: GoldenSpiralUserParam;
  colorModes = confColorModes;
  drawings = confDrawings;
  angles = [
    { value: 137.5, title: 'Golden Ratio' },
    { value: 137.5 / 2.0, title: 'Golden Ratio /2' },
    { value: 137.5 / 3.0, title: 'Golden Ratio /3' },
    { value: 137.5 / 4.0, title: 'Golden Ratio /4' },
    { value: 137.5 / 5.0, title: 'Golden Ratio /5' },
    { value: (1.0 - 2.0 / 1.0) * 360.0, title: 'Fibo 2/1' },
    { value: (1.0 - 3.0 / 2.0) * 360.0, title: 'Fibo 3/2' },
    { value: (1.0 - 5.0 / 3.0) * 360.0, title: 'Fibo 5/3' },
    { value: (1.0 - 8.0 / 5.0) * 360.0, title: 'Fibo 8/5' },
    { value: (1.0 - 13.0 / 8.0) * 360.0, title: 'Fibo 13/8' },
    { value: (1.0 - 21.0 / 13.0) * 360.0, title: 'Fibo 21/13' },
    { value: (1.0 - 34.0 / 21.0) * 360.0, title: 'Fibo 34/21' },
    { value: (1.0 - 55.0 / 34.0) * 360.0, title: 'Fibo 55/34' },
    { value: (1.0 - 89.0 / 55.0) * 360.0, title: 'Fibo 89/55' },
    { value: 45.0, title: '45°' },
    { value: 90.0, title: '90°' },
    { value: 180.0, title: '180°' },
  ];

  onRandom(): void {
    const p = this.userParam;
    //this.param.angle = this.random(0,360,0.1);
    p.sizeI = this.random(0, 40, 10);
    p.sizeR = this.random(0, 40, 10);
    p.speedR = this.random(-10, 10, 0.2);
    p.speedG = this.random(-15, 15, 1);
    p.dr = this.random(10, 60, 1);
    p.rStart = this.random(-500, 500, 10);
    p.rEnd = this.random(-500, 500, 10);
    p.alpha = this.random(45, 100, 5);
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
