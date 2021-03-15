import { Injectable } from '@angular/core';
import { Animation3dParam, Draw3dService, UserParam } from './scene-model';
import { Scene3dRotationService } from './scene3drotation.service';

@Injectable()
export class Scene3dService {
  private fullParam!: Animation3dParam;
  private drawService!: Draw3dService;
  public screenSize = '';

  init(
    canvas: HTMLCanvasElement,
    drawService: Draw3dService,
    userParam: UserParam,
    sceneRotationService: Scene3dRotationService
  ): void {
    const fullParam = {
      userParam: userParam,
      centerx: 0,
      centery: 0,
      canvas: canvas,
      sceneRotationService: sceneRotationService
    } as Animation3dParam;
    this.fullParam = fullParam;

    this.drawService = drawService;
    this.resize();
    this.drawService.init(fullParam);
  }

  public draw(delay: number): void {
    this.drawService.draw(delay, this.fullParam);
  }

  public restart(): void {
    this.resize();
    this.drawService.restart(this.fullParam);
  }

  public resize(): void {
    const canvas = this.fullParam.canvas;
    const wrapper = canvas.parentElement;
    if (wrapper) {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
    }
    this.fullParam.centerx = (0.5 + canvas.width / 2) << 0;
    this.fullParam.centery = (0.5 + canvas.height / 2) << 0;
    //console.log(`Window: ${window.innerWidth}x${window.innerHeight}`);
    //console.log(`Canvas: ${canvas.width}x${canvas.height}`);
    //this.drawService.restart(this.fullParam);
  }
}
