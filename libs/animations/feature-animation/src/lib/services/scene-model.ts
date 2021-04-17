import { ChangeDetectorRef, Component } from '@angular/core';
import { Scene3dRotationService } from './scene3drotation.service';

export const confColorModes = [
  { value: 1, title: 'Mode1' },
  { value: 2, title: 'Mode2' },
  { value: 3, title: 'Mode3' },
  { value: 4, title: 'Mode4' },
  { value: 5, title: 'Red' },
  { value: 6, title: 'Green' },
  { value: 7, title: 'Blue' },
  { value: 8, title: 'Grey' },
  { value: 9, title: 'Orange' },
  { value: 10, title: 'EmptyCircles' },
  { value: 11, title: 'FullCircles' },
];

export const confBackgroundModes = [
  { value: 0, title: 'Init-Black' },
  { value: 1, title: 'Init-White' },
  { value: 2, title: 'Black' },
  { value: 3, title: 'White' },
  { value: 4, title: 'Gradient' },
  { value: 5, title: 'Alpha 20%' },
  { value: 6, title: 'Alpha 7%' },
  { value: 7, title: 'Alpha 3%' },
  { value: 8, title: 'AlphaX' },
];

export const confDrawings = [
  { value: 'circle', title: 'Circles' },
  { value: 'leaf', title: 'Leafs' },
 // { value: 'triangle', title: 'Triangles' },
 // { value: 'square', title: 'Squares' },
];

export interface UserParam {
  bgMode: number;
  colorMode: number;
  scale: number;
}
export const defaultUserParam = {
  bgMode: 8,
  colorMode: 2,
  scale: 1,
} as UserParam;

export interface AnimationParam {
  centerx: number;
  centery: number;
  canvasContext: CanvasRenderingContext2D;
  userParam: UserParam;
}

export interface Animation3dParam {
  centerx: number;
  centery: number;
  canvas: HTMLCanvasElement;
  userParam: UserParam;
  sceneRotationService: Scene3dRotationService;
}

export interface DrawService {
  init(fullParam: AnimationParam): void;
  draw(delay: number, fullParam: AnimationParam): void;
  restart(fullParam: AnimationParam): void;
}

export interface Draw3dService {
  init(fullParam: Animation3dParam): void;
  draw(delay: number, fullParam: Animation3dParam): void;
  restart(fullParam: Animation3dParam): void;
}




