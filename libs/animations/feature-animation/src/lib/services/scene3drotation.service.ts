import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class Scene3dRotationService implements OnDestroy {
  canvas!: HTMLCanvasElement;

  targetRotationy = 0;
  targetRotationx = 0;
  targetRotationxOnMouseDown = 0;
  targetRotationyOnMouseDown = 0;
  mouseX = 0;
  mouseXOnMouseDown = 0;
  mouseY = 0;
  mouseYOnMouseDown = 0;
  halfWidth!: number;
  halfHeight!: number;

  public init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.resize();
  }

  public addEventListeners(): void {
    this.setMouseEventListener();
  }

  public resize() {
    this.halfWidth = this.canvas.width / 2;
    this.halfHeight = this.canvas.height / 2;
  }

  public onDocumentMouseDown(event: MouseEvent) {
    event.preventDefault();
    // console.log('onDocumentMouseDown');

    this.setMouseEventListener();

    this.mouseXOnMouseDown = event.clientX - this.halfWidth;
    this.targetRotationxOnMouseDown = this.targetRotationx;

    this.mouseYOnMouseDown = event.clientY - this.halfHeight;
    this.targetRotationyOnMouseDown = this.targetRotationy;
  }

  public onDocumentMouseMove(event: MouseEvent) {
    // console.log('onDocumentMouseMove');

    this.mouseX = event.clientX - this.halfWidth;
    this.targetRotationx =
      this.targetRotationxOnMouseDown +
      (this.mouseX - this.mouseXOnMouseDown) * 0.02;

    this.mouseY = event.clientY - this.halfHeight;
    this.targetRotationy =
      this.targetRotationyOnMouseDown +
      (this.mouseY - this.mouseYOnMouseDown) * 0.02;
  }

  public onDocumentMouseUp() {
    // console.log('onDocumentMouseUp');
    this.removeMouseEventListener();
  }

  public onDocumentMouseOut() {
    // console.log('onDocumentMouseOut');
    this.removeMouseEventListener();
  }

  public onDocumentTouchStart(event: TouchEvent) {
    // console.log('onDocumentTouchStart');
    if (event.touches.length === 1) {
      event.preventDefault();

      this.mouseXOnMouseDown = event.touches[0].pageX - this.halfWidth;
      this.targetRotationxOnMouseDown = this.targetRotationx;

      this.mouseYOnMouseDown = event.touches[0].pageY - this.halfHeight;
      this.targetRotationyOnMouseDown = this.targetRotationy;
    }
  }

  public onDocumentTouchMove(event: TouchEvent) {
    // console.log('onDocumentTouchMove');
    if (event.touches.length === 1) {
      event.preventDefault();

      this.mouseX = event.touches[0].pageX - this.halfWidth;
      this.targetRotationx =
        this.targetRotationxOnMouseDown +
        (this.mouseX - this.mouseXOnMouseDown) * 0.05;

      this.mouseY = event.touches[0].pageY - this.halfHeight;
      this.targetRotationy =
        this.targetRotationyOnMouseDown +
        (this.mouseY - this.mouseYOnMouseDown) * 0.05;
    }
  }

  private setMouseEventListener() {
    this.canvas.addEventListener(
      'mousemove',
      this.onDocumentMouseMove.bind(this),
      false
    );
    this.canvas.addEventListener(
      'mouseup',
      this.onDocumentMouseUp.bind(this),
      false
    );
    this.canvas.addEventListener(
      'mouseout',
      this.onDocumentMouseOut.bind(this),
      false
    );
  }

  private removeMouseEventListener() {
    this.canvas.removeEventListener(
      'mousemove',
      this.onDocumentMouseMove.bind(this),
      false
    );
    this.canvas.removeEventListener(
      'mouseup',
      this.onDocumentMouseUp.bind(this),
      false
    );
    this.canvas.removeEventListener(
      'mouseout',
      this.onDocumentMouseOut.bind(this),
      false
    );
  }

  ngOnDestroy(): void {
    this.removeMouseEventListener();
  }
}
