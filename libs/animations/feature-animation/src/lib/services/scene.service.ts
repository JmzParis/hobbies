import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ColorService } from '@hobbies/shared/util-drawing';
import { AnimationParam, UserParam } from './scene-param';

export interface DrawService {
  init(fullParam: AnimationParam): void;
  draw(delay: number, fullParam: AnimationParam): void;
  restart(fullParam: AnimationParam): void;
}

@Injectable({
  providedIn: 'root',
})
export abstract class SceneService {
  private fullParam!: AnimationParam;
  private drawService!: DrawService;
  public screenSize = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private colorService: ColorService
  ) {}

  init(
    canvasContext: CanvasRenderingContext2D,
    drawService: DrawService,
    userParam: UserParam
  ): void {
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
    this.colorService;
    this.colorService.init(
      fullParam.canvasContext,
      fullParam.userParam.colorMode,
      10
    );
    this.colorService.background(fullParam.userParam.bgMode, false);
  }

  public draw(delay: number): void {
    this.colorService.background(this.fullParam.userParam.bgMode, true);
    this.drawService.draw(delay, this.fullParam);
  }

  public restart(): void {
    this.resize();
    this.colorService.background(this.fullParam.userParam.bgMode, false);
    this.drawService.restart(this.fullParam);
  }

  public resize(): void {
    const canvas = this.fullParam.canvasContext.canvas;
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    const docElement = this.document.documentElement;
    canvas.width = docElement.clientWidth;
    canvas.height = docElement.clientHeight;

    this.fullParam.canvasContext.scale(1, 1);

    this.fullParam.centerx = (0.5 + canvas.width / 2) << 0;
    this.fullParam.centery = (0.5 + canvas.height / 2) << 0;
    console.log(`Window: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`Client: ${docElement.clientWidth}x${docElement.clientHeight}`);
    console.log(`canvas: ${canvas.width}x${canvas.height}`);
    //console.log(`center: ${this.fullParam.centerx}x${this.fullParam.centery}`);
  }

  protected background(): void {
    //this.resize();
    this.colorService.background(this.fullParam.userParam.bgMode, false);
  }
}
