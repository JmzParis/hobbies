import { Injectable } from '@angular/core';
import {
  ColorService,
  DrawStyle,
  SpriteDrawService,
} from '@hobbies/shared/util-drawing';
import { Mover, Space, Vector, SpaceType } from '@hobbies/shared/util-kinetic';
import { DrawService } from '../../services/scene.service';
import { OrbitParam, OrbitUserParam } from './orbit-param';

@Injectable({
  providedIn: 'root',
})
export class OrbitService implements DrawService {
  private space: Space = new Space(SpaceType.Infinite);
  private movers: Mover[] = [];
  private xc = 0;
  private yc = 0;

  constructor(
    private colorService: ColorService,
    private spriteDrawService: SpriteDrawService
  ) {}

  public init(fullParam: OrbitParam): void {
    this.xc = fullParam.centerx;
    this.yc = fullParam.centery;
    this.space.init(fullParam.centerx * 2, fullParam.centery * 2, 20);
    const orbitUserParam = fullParam.userParam as OrbitUserParam;
    this.buildSystem(orbitUserParam);
    this.positionStableSystem(orbitUserParam);
  }

  public restart(fullParam: OrbitParam): void {
    this.init(fullParam);
  }

  public buildSystem(userParam: OrbitUserParam): void {
    this.movers = [];
    for (let i = 0; i < userParam.corpsCount; i++) {
      const mass = Math.random() * userParam.maxMass;
      //console.log('Mass: (' + mass + ')');
      const mover = new Mover(mass, 0, 0);
      mover.param = this.colorService.getRandomStyle();
      this.movers[i] = mover;
    }
  }

  public positionStableSystem(userParam: OrbitUserParam): void {
    const v = userParam.speedFactor;
    const movers = this.movers;
    let momentum: Vector;
    const epsilon = 2;
    let centered: boolean;

    let iter = 0;
    do {
      iter++;
      momentum = new Vector(0, 0);
      for (const mover of movers) {
        const r1 = 0.5 - Math.random();
        const r2 = 0.5 - Math.random();
        mover.setPosition(this.xc + this.xc * r1, this.yc + this.yc * r2);
        do {
          const r1 = 0.5 - Math.random();
          const r2 = 0.5 - Math.random();
          mover.setVelocity((v * r1) / mover.mass, (v * r2) / mover.mass);
        } while (mover.velocity.mag() < 10 / mover.mass);
      }
      for (const mover of movers) {
        momentum.add(Vector.mult(mover.velocity.clone(), mover.mass));
      }
      centered =
        Math.abs(momentum.x) < epsilon && Math.abs(momentum.y) < epsilon;
      /*
          if(!centered)
              console.log('Rejected: ('+Math.round(momentum.x)+','+Math.round(momentum.y)+')');
              */
    } while (!centered);
    console.log(
      'Centered: ' +
        iter +
        ' (' +
        Math.round(momentum.x) +
        ',' +
        Math.round(momentum.y) +
        ')'
    );
  }

  public draw(delay: number, fullParam: OrbitParam): void {
    //this.colorService.setDefaultColors();
    fullParam.canvasContext.lineWidth = 2;
    const orbitUserParam = fullParam.userParam as OrbitUserParam;
    const bgMode = orbitUserParam.bgMode;
    if (bgMode > 1) {
      //this.background(bgMode);
    }
    const g = orbitUserParam.gravity;
    const movers = this.movers;
    const c = fullParam.canvasContext;
    const fxDraw = (x: number, y: number, r: number, s: DrawStyle) => {
      this.colorService.setDrawStyle(s);
      this.spriteDrawService.drawCircle(c, x, y, r);
    };
    const moverCount = movers.length;
    for (let i = 0; i < moverCount; i++) {
      const mover = movers[i];
      for (let j = 0; j < moverCount; j++) {
        if (i !== j) {
          mover.applyForce(movers[j].calculateAttraction(mover, g));
        }
      }

      // mover.applyForce(wind);
      // mover.applyForce(mover.computeGravity());
      // mover.applyForce(mover.calculateFriction());
      mover.update();
      const pos = mover.position;
      const x = (0.5 + pos.x) << 0;
      const y = (0.5 + pos.y) << 0;
      fxDraw(x, y, mover.mass, mover.param);
      this.space.checkEdges(mover);
    }
  }

  public getInfoMessage(): string {
    return '';
  }
}
