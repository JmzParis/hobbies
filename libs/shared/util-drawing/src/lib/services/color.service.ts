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
  //private canvasContext: CanvasRenderingContext2D | null = null;

  private isTabInit = false;
  private tabFill = new Array<string>(360);
  private tabStroke = new Array<string>(360);

  private cGradient: CanvasGradient | null = null;

  public init(
    c: CanvasRenderingContext2D,
    mode: number,
    alpha: number
  ) {
    //this.canvasContext = canvasContext;
    this.setModeAndAlpha(mode, alpha);

    c.fillStyle = Color('hsla(360, 100%, 50%, 0.5)')
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

  public setDefaultColors(c: CanvasRenderingContext2D) {
    //const c = this.canvasContext;
    //if (c == null) return;
    c.lineWidth = 5;
    //c.fillStyle = '#05a505';
    c.fillStyle = 'chartreuse';
    c.strokeStyle = '#005010';
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

  public setDrawStyle(c: CanvasRenderingContext2D, style: DrawStyle) {
    //const c = this.canvasContext;
    //if (c == null) return;
    c.fillStyle = style.fillStyle;
    c.strokeStyle = style.strokeStyle;
  }

  public setColors(c: CanvasRenderingContext2D, a: number) {
    //const cc = this.canvasContext;
    //if (cc == null) return;
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
      const d = Math.round(Math.abs(a / this.mode) % 360);
      // console.log(`${c}=>${this.tabFill[c]}`)
      c.fillStyle = this.tabFill[d];
      c.strokeStyle = this.tabStroke[d];
    } else if (this.mode === 5) {
      //Red
      c.lineWidth = 2;
      const d = Math.abs(a / 2) % 255;
      const color = Color({ r: d, g: 0, b: 0 }).alpha(this.alpha / 100.0);
      c.fillStyle = color.toString();
      c.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 6) {
      //Green
      c.lineWidth = 2;
      const d = Math.abs(a / 2) % 255;
      const color = Color({ r: 0, g: d, b: 0 }).alpha(this.alpha / 100.0);
      c.fillStyle = color.toString();
      c.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 7) {
      //Blue
      c.lineWidth = 2;
      const d = Math.abs(a / 2) % 255;
      const color = Color({ r: 0, g: 0, b: d }).alpha(this.alpha / 100.0);
      c.fillStyle = color.toString();
      c.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 8) {
      c.lineWidth = 2;
      const d = Math.abs(a / 2) % 255;
      const color = Color({ r: c, g: d, b: c }).alpha(this.alpha / 100.0);
      c.fillStyle = color.toString();
      c.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 9) {
      c.lineWidth = 2;
      const d = Math.abs(a / 2) % 255;
      const color = Color({ r: c, g: d / 2, b: 0 }).alpha(this.alpha / 100.0);
      c.fillStyle = color.toString();
      c.strokeStyle = color.darken(0.5).toString();
    } else if (this.mode === 10) {
      c.lineWidth = 2;
      const d = Math.abs(a / 2) % 360;
      const color = Color('hsla(360, 100%, 50%, 0.5)')
        .hue(d)
        .alpha(this.alpha / 100.0);
      c.fillStyle = color.alpha(0).toString();
      c.strokeStyle = color.toString();
    } else if (this.mode === 11) {
      c.lineWidth = 2;
      const d = Math.abs(a / 2) % 360;
      const color = Color('hsla(360, 100%, 50%, 0.5)')
        .hue(d)
        .alpha(this.alpha / 100.0);
      c.fillStyle = '#000000';
      c.strokeStyle = color.toString();
    }
  }

  public background(c: CanvasRenderingContext2D, bgMode: number, fromDraw: boolean) {
    if (fromDraw && bgMode <= 1) return;

    //const cc = this.canvasContext;
    //if (cc == null) return;

    let color: Color;
    switch (bgMode) {
      case 0:
        c.fillStyle = '#000000';
        break;
      case 1:
        c.fillStyle = '#FFFFFF';
        break;
      case 2:
        c.fillStyle = '#000000';
        break;
      case 3:
        c.fillStyle = '#FFFFFF';
        break;
      case 4:
        c.fillStyle = this.createGradient(c);
        break;
      case 5:
        color = Color('hsla(360, 0%, 0%, 0.5)').alpha(20 / 100.0);
        c.fillStyle = color.rgb().string();
        break;
      case 6:
        color = Color('hsla(360, 0%, 0%, 0.5)').alpha(7 / 100.0);
        c.fillStyle = color.rgb().string();
        break;
      case 7:
        color = Color('hsla(360, 0%, 0%, 0.5)').alpha(3 / 100.0);
        c.fillStyle = color.rgb().string();
        break;
      case 8:
        c.fillStyle = '#000000BB';
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

    if (bgMode !== 9) c.fillRect(0, 0, c.canvas.width, c.canvas.height);
  }

  private createGradient(c: CanvasRenderingContext2D): CanvasGradient {
    if (this.cGradient) return this.cGradient;
    const cx = c.canvas.width / 2;
    const cy = c.canvas.height / 2;
    const grd = c.createRadialGradient(cx, cy, 5, cx, cy, (cx + cy) / 2);
    grd.addColorStop(0, '#00000000');
    grd.addColorStop(1, '#000000BB');
    this.cGradient = grd;
    return grd;
  }
}
