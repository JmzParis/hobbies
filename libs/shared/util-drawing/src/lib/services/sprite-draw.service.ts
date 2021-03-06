import { Injectable } from '@angular/core';

const twoPi = 2 * Math.PI;

@Injectable({
  providedIn: 'root'
})
export class SpriteDrawService {

  public drawCircle(c: CanvasRenderingContext2D, x: number, y: number, radius: number): void {    
    c.beginPath();
    c.arc(x, y, radius, 0, twoPi, false);
    //c.fillStyle = this.drawStyle.fillStyle;
    c.fill();
    //c.lineWidth = this.drawStyle.lineWidth;
    //c.strokeStyle = this.drawStyle.strokeStyle;
    c.stroke();
    //console.log(`Circle (${x}, ${y}, ${radius})`)
  }

  public drawCircleR(c: CanvasRenderingContext2D, x: number, y: number, radius: number, rotation: number): void {    
    c.beginPath();
    c.arc(x, y, radius, 0, twoPi, false);
    //c.fillStyle = this.drawStyle.fillStyle;
    c.fill();
    //c.lineWidth = this.drawStyle.lineWidth;
    //c.strokeStyle = this.drawStyle.strokeStyle;
    c.stroke();
    //console.log(`Circle (${x}, ${y}, ${radius})`)
  }

  public line(c: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void {    
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
    //console.log(`(${x1}, ${y1}) - (${x2}, ${y2})`)
  }

  public drawLeaf(c : CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
    
    //c.lineWidth = this.drawStyle.lineWidth;

    c.save();
    c.translate(x, y);
    c.scale(size / 400, size / 400);
    c.rotate(rotation - (Math.PI / 2.0));
    c.beginPath();

    c.moveTo(0, 0);

    //c.strokeStyle = this.drawStyle.strokeStyle; // '#009900';
    c.bezierCurveTo(70, -40, 300, 10 - 150, 400, 0);
    c.stroke();

    c.moveTo(0, 0);
    //c.strokeStyle = this.drawStyle.strokeStyle; // '#009900';
    c.bezierCurveTo(70, -20, 330, 160, 400, 0);
    c.stroke();
    //c.fillStyle = this.drawStyle.fillStyle; // '#99FF66';
    c.fill();


    //c.strokeStyle = this.drawStyle.strokeStyle; // '#009900';
    c.moveTo(150, 0);
    c.bezierCurveTo(300, -50, 300, 30, 400, 0);
    c.stroke();
    c.closePath();

    c.beginPath();
    //c.strokeStyle = '#996633';
    c.moveTo(400, 0);
    c.lineTo(480, 0);
    c.closePath();
    c.stroke();

    c.restore();
  }

}
