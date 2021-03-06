/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { DrawService } from '../../services/scene.service';
import { GoldenSpiralParam } from './golden-spiral-param';
import { GoldenSpiralService } from './golden-spiral.service';

@Injectable({
  providedIn: 'root',
})
export class GoldenDoubleSpiralService implements DrawService {
  constructor(private singleGoldenSpiralService: GoldenSpiralService) {}

  public init(fullParam: GoldenSpiralParam): void {
    this.singleGoldenSpiralService.init(fullParam);
  }

  public restart(fullParam: GoldenSpiralParam): void {
    this.init(fullParam);
  }

  public draw(delay: number, fullParam: GoldenSpiralParam): void {
    const width = fullParam.canvasContext.canvas.width;
    const c1x = (0.5 + width / 3) << 0;
    const c2x = (0.5 + (width * 2) / 3) << 0;
    const service = this.singleGoldenSpiralService;
    service.drawSpiral(fullParam, c1x, fullParam.centery, 1);
    service.drawSpiral(fullParam, c2x, fullParam.centery, -1);
  }
}
