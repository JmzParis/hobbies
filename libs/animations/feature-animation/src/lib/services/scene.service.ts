import { Injectable } from '@angular/core';
import { ColorService } from '@hobbies/shared/util-drawing';
import { AnimationParam, DrawService, UserParam } from './scene-model';


@Injectable()
export class SceneService {
  private fullParam!: AnimationParam;
  private drawService!: DrawService;
  public screenSize = '';

  constructor(private colorService: ColorService) {}

  init(
    canvas: HTMLCanvasElement,    
    drawService: DrawService,
    userParam: UserParam
  ): void {
    const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
    const fullParam = {
      userParam: userParam,
      centerx: 0,
      centery: 0,
      canvasContext: canvasContext,
    } as AnimationParam;
    this.fullParam = fullParam;

    this.drawService = drawService;
    this.resize();
    this.drawService.init(fullParam);    
    this.colorService.init(
      fullParam.canvasContext,
      fullParam.userParam.colorMode,
      10
    );
    this.setBackground(false);
  }

  public draw(delay: number): void {
    this.setBackground(true);
    this.drawService.draw(delay, this.fullParam);
  }

  public restart(): void {
    this.resize();
    this.setBackground(false);
    this.drawService.restart(this.fullParam);
  }

  public resize(): void {
    const canvas = this.fullParam.canvasContext.canvas;
    const wrapper = canvas.parentElement;
    if (wrapper) {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
    }
    this.fullParam.centerx = (0.5 + canvas.width / 2) << 0;
    this.fullParam.centery = (0.5 + canvas.height / 2) << 0;
    //console.log(`Window: ${window.innerWidth}x${window.innerHeight}`);
    //console.log(`Canvas: ${canvas.width}x${canvas.height}`);
  }

  private setBackground(fromDraw: boolean): void {
    const c = this.fullParam.canvasContext;
    const userParam = this.fullParam.userParam;
    this.colorService.background(c, userParam.bgMode, fromDraw);
  }
}
