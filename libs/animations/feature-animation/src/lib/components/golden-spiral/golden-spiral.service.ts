/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { ColorService, SpriteDrawService } from '@hobbies/shared/util-drawing';
import { DrawService } from '../../services/scene-model';
import {
  GoldenSpiralParam,
  GoldenSpiralUserParam,
} from './golden-spiral-param';

const toRad = (2.0 * Math.PI) / 360.0;
const goldenAngle = 137.5;

@Injectable({
  providedIn: 'root',
})
export class GoldenSpiralService implements DrawService {
  imgCount=0;

  constructor(
    private colorService: ColorService,
    private spriteDrawService: SpriteDrawService
  ) {}
  
  public init(fullParam: GoldenSpiralParam): void {
    fullParam.aStartR = 0;
    fullParam.aStartG = 0;
  }

  public restart(fullParam: GoldenSpiralParam): void {
    this.init(fullParam);
  }

  public draw(delay: number, fullParam: GoldenSpiralParam): void {
    const cx = fullParam.centerx;
    const cy = fullParam.centery;
    this.drawSpiral(fullParam, cx, cy, 1);
  }

  public drawSpiral(fullParam: GoldenSpiralParam, cx: number, cy: number, factor: number): void {

    const userParam = fullParam.userParam as GoldenSpiralUserParam;
    fullParam.aStartR += userParam.speedR * toRad * factor;
    fullParam.aStartG -= userParam.speedG * goldenAngle * toRad;

    const dr = userParam.dr / 25.0;
    const rStart = userParam.rStart;
    const rEnd = userParam.rEnd;
    let a = fullParam.aStartR +  fullParam.aStartG;
    const sizeConst = userParam.sizeI / 2.0;
    const sizeR2 = userParam.sizeR / 50.0;
    const goldenAngleRad = userParam.angle * toRad;
    
    const c = fullParam.canvasContext;    
    if(this.imgCount++ %2000) {
      this.colorService.reset(); // to refresh alpha
    }
    this.colorService.setModeAndAlpha(userParam.colorMode, userParam.alpha);
    const drawFx =
      userParam.drawing === 'leaf'
        ? this.spriteDrawService.drawLeaf
        : this.spriteDrawService.drawCircleR;
    //const drawFx = this.spriteDrawService.drawLeaf;
    if (rStart < rEnd) {
      for (let r = rStart; r < rEnd; r += dr) {
        this.colorService.setColors(c, a);
        const rx = (0.5 + cx + r * Math.sin(a)) << 0;
        const ry = (0.5 + cy + r * Math.cos(a)) << 0;
        const size = (0.5 + sizeConst + Math.sqrt(Math.abs(r)) * sizeR2) << 0;
        drawFx(c, rx, ry, size, -a + r / 100.0);
        //this.drawItem(rx, ry, size, -a);
        a += goldenAngleRad;
      }
    } else {
      for (let r = rStart; rEnd < r; r -= dr) {
        this.colorService.setColors(c, a);
        const rx = (0.5 + cx + r * Math.sin(a)) << 0;
        const ry = (0.5 + cy + r * Math.cos(a)) << 0;
        const size = (0.5 + sizeConst + Math.sqrt(Math.abs(r)) * sizeR2) << 0;
        drawFx(c, rx, ry, size, -a + r / 100.0);
        a -= goldenAngleRad;
      }
    }
  }  
}
