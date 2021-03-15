import { Injectable } from '@angular/core';
import { Mover, Space, Vector } from '@hobbies/shared/util-kinetic';
import { SwarmParam, SwarmUserParam } from './swarm-param';
import { ImageStoreService } from '@hobbies/shared/util-drawing';
import { DrawService } from '../../services/scene-model';

interface MoverParam {
  img: HTMLImageElement;
}

@Injectable({
  providedIn: 'root',
})
export class SwarmService implements DrawService {
  private space: Space = new Space();
  private movers: Mover[] = [];

  private imageStoreKey = 'swarm';
  private images = [] as HTMLImageElement[];
  
  constructor(private imageStore: ImageStoreService) {
    this.loadAllImages();
  }

  private loadAllImages() {
    const path = 'assets/img/bubble/';
    const t = [] as string[];
    t.push(path + 'BulleNoire.png');
    t.push(path + 'BulleVerte.png');
    t.push(path + 'BulleBleue.png');
    t.push(path + 'BulleRouge.png');
    t.push(path + 'BulleCyan.png');
    t.push(path + 'BulleOrange.png');
    t.push(path + 'BulleJaune.png');
    t.push(path + 'BulleViolette.png');
    const bloc = this.imageStore.load(this.imageStoreKey, t);  
    this.images = bloc.images;
  }

  public init(fullParam: SwarmParam): void {
    const canvas = fullParam.canvasContext.canvas;
    const imgW = 35; // the bubble width they are print at the coordinate of their top left corner
    const imgH = 35;
    const sw = canvas.width - imgW;
    const sh = canvas.height - imgH;
    this.space.init(sw, sh, 5);
    this.buildSystem(fullParam);
  }

  public restart(fullParam: SwarmParam): void {
    this.init(fullParam);
  }

  public draw(delay: number, fullParam: SwarmParam): void {
    if (!this.imageStore.areAllImageLoaded(this.imageStoreKey)) return;

    const swarmUserParam = fullParam.userParam as SwarmUserParam;

    this.move(swarmUserParam);

    const c = fullParam.canvasContext;
    const fxDraw = (x: number, y: number, img: HTMLImageElement) => {
      c.drawImage(img, x, y, img.width, img.height);
    };
    const moverCount = this.movers.length;
    for (let i = 0; i < moverCount; i++) {
      const mover = this.movers[i];
      const pos = mover.position;
      const x = (0.5 + pos.x) << 0;
      const y = (0.5 + pos.y) << 0;
      const p = mover.param as MoverParam;
      fxDraw(x, y, p.img);

      this.space.checkEdges(mover);
    }
  }

  private move(swarmUserParam: SwarmUserParam) {
    const movers = this.movers;
    const familyCount = swarmUserParam.familyCount;
    const g = swarmUserParam.gravity;
    for (let i = 0; i < movers.length; i++) {
      const mover = movers[i];
      for (let j = 0; j < movers.length; j++) {
        if (i !== j && j % familyCount === i % familyCount) {
          mover.applyForce(movers[j].calculateStrangeAttraction(mover, g));
        }
      }
      mover.update();
    }
  }

  private buildSystem(fullParam: SwarmParam): void {
    const swarmUserParam = fullParam.userParam as SwarmUserParam;
    const moverCount = swarmUserParam.familySize * swarmUserParam.familyCount;
    this.movers = Array<Mover>(moverCount);
    for (let i = 0; i < moverCount; i++) {
      const mass = 100;
      this.movers[i] = new Mover(mass, 0, 0);
      this.movers[i].param = {
        img: this.images[i % swarmUserParam.familyCount],
      } as MoverParam;
    }
    this.initPositionAndVelocity(fullParam);
  }

  private initPositionAndVelocity(fullParam: SwarmParam): void {
    const v = 200.0;
    const movers = this.movers;
    const canvas = fullParam.canvasContext.canvas;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const wx = (canvas.width * 8) / 9;
    const wy = (canvas.height * 8) / 9;
    let iter = 0;
    // do{
    iter++;
    const momentum = new Vector(0, 0);
    for (const mover of movers) {
      const r1 = 0.5 - Math.random();
      const r2 = 0.5 - Math.random();
      const r3 = 0.5 - Math.random();
      const r4 = 0.5 - Math.random();
      mover.setPosition(cx + wx * r1, cy + wy * r2);
      mover.setVelocity((v * r3) / mover.mass, (v * r4) / mover.mass);
    }
    for (const mover of movers) {
      momentum.add(Vector.mult(mover.velocity.clone(), mover.mass));
    }
    //centered = Math.abs(momentum.x) < epsilon && Math.abs(momentum.y) < epsilon;
    /*
        if(!centered)
            console.log('Rejected: ('+Math.round(momentum.x)+','+Math.round(momentum.y)+')');
            */
    // } while(!centered);
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
}
