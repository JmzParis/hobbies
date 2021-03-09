import { Injectable } from '@angular/core';
import { Mover, Space } from '@hobbies/shared/util-kinetic';
import { ColorService, SpriteDrawService } from '@hobbies/shared/util-drawing';
import { SkinParam, SkinUserParam } from './skin-param';
import { DrawService } from '../../services/scene.service';
import { MoverLink, MoverParam, Xyr } from './skin-model';


@Injectable({
  providedIn: 'root',
})
export class SkinService implements DrawService {
  private space: Space = new Space();
  private spots: Mover[] = [];

  constructor(
    private colorService: ColorService,
    private spriteDrawService: SpriteDrawService
  ) {}

  public init(fullParam: SkinParam): void {
    const skinUserParam = fullParam.userParam as SkinUserParam;
    const canvas = fullParam.canvasContext.canvas;
    this.space.init(canvas.width, canvas.height, canvas.width/20);

    this.spots = Array<Mover>(skinUserParam.spotCount);
    for (let i = 0; i < this.spots.length; i++) {
      const mass = 100;
      const mover = new Mover(mass, 0, 0);
      this.resetMover(mover, fullParam.centerx, fullParam.centery);
      this.spots[i] = mover;
    }
  }

  public restart(fullParam: SkinParam): void {
    this.init(fullParam);
  }

  private resetMover(m: Mover, halfWidth: number, halfHeight: number) {
    m.param = { radius: 2, age: 0, links: [] } as MoverParam;

    m.setPosition(
      (1.5 - Math.random()) * halfWidth,
      (1.5 - Math.random()) * halfHeight
    );
    m.stopMotion();
  }

  private near(skinUserParam: SkinUserParam) {
    const t = this.spots.map(
      (m: Mover) =>
        ({
          x: m.position.x,
          y: m.position.y,
          r: m.param.radius,
          m: m,
        } as Xyr)
    );

    const repulsionZone = skinUserParam.repulsionZone;
    const spotCount = this.spots.length;
    for (let i = 0; i < spotCount; i++) {
      const m1 = t[i];
      const m1p = m1.m.param as MoverParam;
      for (let j = i + 1; j < spotCount; j++) {
        const m2 = t[j];
        const m2p = m2.m.param as MoverParam;
        const dx = m1.x - m2.x;
        const dy = m1.y - m2.y;
        const d = Math.sqrt(dx * dx + dy * dy) - m1.r - m2.r;

        //console.log(d);
        if (d < repulsionZone) {
          m1p.links.push({ m: m2.m, d: d } as MoverLink);
          m2p.links.push({ m: m1.m, d: d } as MoverLink);
        }
      }
    }
    this.move(skinUserParam);
  }

  private move(skinUserParam: SkinUserParam) {
    const spotCount = this.spots.length;
    for (let i = 0; i < spotCount; i++) {
      const m = this.spots[i];
      const p = m.param as MoverParam;
      m.applyForce(m.calculateDrag(skinUserParam.dragIntensity));
      p.links
        .map((l) => l.m)
        .forEach((m2) =>
          m.applyForce(
            m2.calculateAttraction(m, -skinUserParam.repulsionIntensity)
          )
        );

      m.update();
    }
  }

  public draw(delay: number, fullParam: SkinParam): void {
    const skinUserParam = fullParam.userParam as SkinUserParam;
    const c = fullParam.canvasContext;
    this.colorService.setDefaultColors(c);
    this.near(skinUserParam);
    
    const fxDraw = (x: number, y: number, r: number) => {
      this.spriteDrawService.drawCircle(c, x, y, r);
    };
    const spotCount = this.spots.length;
    for (let i = 0; i < spotCount; i++) {
      const mover = this.spots[i];
      const pos = mover.position;
      const x = (0.5 + pos.x) << 0;
      const y = (0.5 + pos.y) << 0;
      const p = mover.param as MoverParam;
      fxDraw(x, y, p.radius);

      if (p.links.length < 1) {
        if (p.radius < 100) p.radius++;
        mover.mass = 100 + p.radius * p.radius;
      } else {
        // p.links.map(l=>l.m.position).forEach(linkedPos=> this.spriteDrawService.line(linkedPos.x, linkedPos.y, x, y));
        p.radius = p.radius > p.links.length ? p.radius - p.links.length : 1;
        mover.mass = 100 + p.radius * p.radius;
        p.links = [];
      }
      this.surviveOrRebirth(mover, p.age++, fullParam);
      this.space.checkEdges(mover);
    }
  }

  private surviveOrRebirth(
    mover: Mover,
    age: number,
    fullParam: SkinParam
  ): void {
    const skinUserParam = fullParam.userParam as SkinUserParam;
    if (age * Math.random() > skinUserParam.ageThreshold) {
      this.resetMover(mover, fullParam.centerx, fullParam.centery);
    }
  }
}
