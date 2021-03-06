import { Injectable } from '@angular/core';
import * as Color from 'color';

export interface DrawStyle {
  lineWidth: number;
  fillStyle: string | CanvasGradient | CanvasPattern;
  strokeStyle: string | CanvasGradient | CanvasPattern;
}

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private mode = 1;
  private alpha = 100.0;
  private canvasContext: CanvasRenderingContext2D | null = null;

  private isTabInit = false;
  private tabFill = new Array<string>(360);
  private tabStroke = new Array<string>(360);

  private cGradient: CanvasGradient | null = null;

  public init(
    canvasContext: CanvasRenderingContext2D,
    mode: number,
    alpha: number
  ) {
    this.canvasContext = canvasContext;
    this.setModeAndAlpha(mode, alpha);

    this.canvasContext.fillStyle = Color('hsla(360, 100%, 50%, 0.5)')
      .rgb()
      .string();
  }

  public reset(){
    this.isTabInit = false;
  }
  
  public setModeAndAlpha(mode: number, alpha: number) {
    this.mode = mode;
    this.alpha = alpha;
  }

  public setDefaultColors() {
    const cc = this.canvasContext;
    if (cc == null) return;
    cc.lineWidth = 5;
    //cc.fillStyle = '#05a505';
    cc.fillStyle = 'chartreuse';
    cc.strokeStyle = '#005010';
  }

  public getRandomStyle(): DrawStyle {
    const color = Color('hsla(360, 100%, 50%, 0.5)')
      .hue(Math.random() * 360)
      .alpha(1);
    return {
      fillStyle: color.rgb().string(),
      strokeStyle: color.darken(0.7).rgb().string(),
    } as DrawStyle;
  }

  public setDrawStyle(style: DrawStyle) {
    const cc = this.canvasContext;
    if (cc == null) return;
    cc.fillStyle = style.fillStyle;
    cc.strokeStyle = style.strokeStyle;
  }

  public setColors(a: number) {
    const cc = this.canvasContext;
    if (cc == null) return;
    if (this.mode <= 4) {
      //this.canvasContext.lineWidth = 1;
      if (!this.isTabInit) {
        for (let i = 0; i < 360; i++) {
          const color = Color('hsla(360, 100%, 50%, 0.5)')
            .hue(i)
            .alpha(this.alpha / 100.0);
          this.tabFill[i] = color.rgb().string();
          this.tabStroke[i] = color.darken(0.5).rgb().string();
        }

        this.isTabInit = true;
      }
      const c = Math.round(Math.abs(a / this.mode) % 360);
      // console.log(`${c}=>${this.tabFill[c]}`)
      cc.fillStyle = this.tabFill[c];
      cc.strokeStyle = this.tabStroke[c];
    } else if (this.mode === 5) {
      //Red
      cc.lineWidth = 2;
      const c = Math.abs(a / 2) % 255;
      const color = Color({ r: c, g: 0, b: 0 }).alpha(this.alpha / 100.0);
      cc.fillStyle = color.toString();
      cc.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 6) {
      //Green
      cc.lineWidth = 2;
      const c = Math.abs(a / 2) % 255;
      const color = Color({ r: 0, g: c, b: 0 }).alpha(this.alpha / 100.0);
      cc.fillStyle = color.toString();
      cc.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 7) {
      //Blue
      cc.lineWidth = 2;
      const c = Math.abs(a / 2) % 255;
      const color = Color({ r: 0, g: 0, b: c }).alpha(this.alpha / 100.0);
      cc.fillStyle = color.toString();
      cc.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 8) {
      cc.lineWidth = 2;
      const c = Math.abs(a / 2) % 255;
      const color = Color({ r: c, g: c, b: c }).alpha(this.alpha / 100.0);
      cc.fillStyle = color.toString();
      cc.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 9) {
      cc.lineWidth = 2;
      const c = Math.abs(a / 2) % 255;
      const color = Color({ r: c, g: c / 2, b: 0 }).alpha(this.alpha / 100.0);
      cc.fillStyle = color.toString();
      cc.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 10) {
      cc.lineWidth = 2;
      const c = Math.abs(a / 2) % 360;
      const color = Color('hsla(360, 100%, 50%, 0.5)')
        .hue(c)
        .alpha(this.alpha / 100.0);
      cc.fillStyle = color.alpha(0).toString();
      cc.strokeStyle = color.toString();
    } else if (this.mode === 11) {
      cc.lineWidth = 2;
      const c = Math.abs(a / 2) % 360;
      const color = Color('hsla(360, 100%, 50%, 0.5)')
        .hue(c)
        .alpha(this.alpha / 100.0);
      cc.fillStyle = '#000000';
      cc.strokeStyle = color.toString();
    }
  }

  public background(bgMode: number, fromDraw: boolean) {
    if (fromDraw && bgMode <= 1) return;

    const cc = this.canvasContext;
    if (cc == null) return;

    let color: Color;
    switch (bgMode) {
      case 0:
        cc.fillStyle = '#000000';
        break;
      case 1:
        cc.fillStyle = '#FFFFFF';
        break;
      case 2:
        cc.fillStyle = '#000000';
        break;
      case 3:
        cc.fillStyle = '#FFFFFF';
        break;
      case 4:
        cc.fillStyle = this.createGradient(cc);
        break;
      case 5:
        color = Color('hsla(360, 0%, 0%, 0.5)').alpha(20 / 100.0);
        cc.fillStyle = color.rgb().string();
        break;
      case 6:
        color = Color('hsla(360, 0%, 0%, 0.5)').alpha(7 / 100.0);
        cc.fillStyle = color.rgb().string();
        break;
      case 7:
        color = Color('hsla(360, 0%, 0%, 0.5)').alpha(3 / 100.0);
        cc.fillStyle = color.rgb().string();
        break;
      case 8:
        cc.fillStyle = '#000000BB';
        break;
      /* case 9:
        cc.drawImage(
          this.imgRadialGradiant,
          0,
          0,
          cc.canvas.width / 2,
          cc.canvas.height / 2
        )*/
    }

    if (bgMode !== 9) cc.fillRect(0, 0, cc.canvas.width, cc.canvas.height);
  }

  private createGradient(cc: CanvasRenderingContext2D): CanvasGradient {
    if (this.cGradient) return this.cGradient;
    const cx = cc.canvas.width / 2;
    const cy = cc.canvas.height / 2;
    const grd = cc.createRadialGradient(cx, cy, 5, cx, cy, (cx + cy) / 2);
    grd.addColorStop(0, '#00000000');
    grd.addColorStop(1, '#000000BB');
    this.cGradient = grd;
    return grd;
  }
}
