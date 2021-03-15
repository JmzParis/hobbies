import { Injectable } from '@angular/core';
import { ImageStoreService, Scrolling } from '@hobbies/shared/util-drawing';
import { DrawService } from '../../services/scene-model';
import { ScrollParam, ScrollUserParam } from './scroll-param';


@Injectable({
  providedIn: 'root',
})
export class ScrollService implements DrawService {
  private imgCalvinHobbesIndex = 0;
  private imageStoreKey = 'scroll';
  private images = [] as HTMLImageElement[];
  private scrollBack: Scrolling | null = null;
  private scrollFront: Scrolling | null = null;

  constructor(private imageStore: ImageStoreService) {
    this.loadAllImages();
  }

  private loadAllImages() {
    const pathLand = 'assets/img/landscape-elements/';
    const pathRep = 'assets/img/repetitive-background/';
    const pathAlpha = 'assets/img/alpha/';
    const pathCalvin = 'assets/img/calvin/';
    const t = [] as string[];
    t.push(pathCalvin + 'CalvinHobbes.png');
    t.push(pathAlpha + 'RadialGradiantLight_600x600.png');
    t.push(pathRep + 'PatternHex.png');
    t.push(pathRep + 'PatternHex2.png');
    t.push(pathRep + 'stars-pattern-tile-xy.jpg');
    t.push(pathRep + 'PurpleCross.png');
    t.push(pathRep + 'PurpleSquare.png');
    t.push(pathRep + 'PurpleSquare2.png');
    t.push(pathRep + 'GreySquare.png');
    t.push(pathRep + 'DarkGreySquare.png');
    t.push(pathRep + 'DarkGreySquare2.png');
    t.push(pathLand + 'tree.png');
    t.push(pathLand + 'treeGreen.png');
    t.push(pathLand + 'treeGreenBig.png');
    t.push(pathRep + 'TwoSquare.png');
    t.push(pathRep + 'TwoSquare2.png');
    t.push(pathRep + 'tartan3.png');
    t.push(pathRep + 'thumb10.jpg');
    t.push(pathRep + 'DarkGreySquare3.png');
    t.push(pathRep + 'DarkGreySquare4.png');
    t.push(pathRep + 'Pat2.png');
    t.push(pathRep + 'Pat3.png');
    t.push(pathLand + 'cloud_transparent_6.png');
    t.push(pathLand + 'clouds.png');
    const bloc = this.imageStore.load(this.imageStoreKey, t);
    this.images = bloc.images;
  }

  public init(fullParam: ScrollParam): void {
    const canvasContext = fullParam.canvasContext;
    
    this.scrollBack = new Scrolling(canvasContext, this.images[4]);
    this.scrollFront = new Scrolling(canvasContext, this.images[3]);
  }

  public restart(fullParam: ScrollParam): void {
    this.init(fullParam);
  }

  public draw(delay: number, fullParam: ScrollParam): void {
    if (!this.imageStore.areAllImageLoaded(this.imageStoreKey)) return;
    const p = fullParam.userParam as ScrollUserParam;
    const images = this.images;
    if (this.scrollBack && 0 <= p.imgBack) {
      this.scrollBack.img = images[p.imgBack];
      this.scrollBack.setSpeed(p.backHorizSpeed, p.backVertSpeed);
      this.scrollBack.draw();
    }
    const canvasContext = fullParam.canvasContext;
    canvasContext.drawImage(images[this.imgCalvinHobbesIndex], 75, 125);

    if (this.scrollFront && 0 <= p.imgFront) {
      this.scrollFront.img = images[p.imgFront];
      this.scrollFront.setSpeed(p.frontHorizSpeed, p.frontVertSpeed);
      this.scrollFront.draw();
    }
  }
}
