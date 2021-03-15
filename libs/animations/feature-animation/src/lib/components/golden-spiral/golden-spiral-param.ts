import { AnimationParam, defaultUserParam, UserParam } from '../../services/scene-model';

export interface GoldenSpiralUserParam extends UserParam {
  drawing: string;

  angle: number;
  sizeI: number;
  sizeR: number;
  speedR: number;
  speedG: number;
  dr: number;
  rStart: number;
  rEnd: number;
  alpha: number;
}

export const defaultGoldenSpiralUserParam = {
  ...defaultUserParam,
  drawing: 'circle',

  angle: 137.5,
  sizeI: 1,
  sizeR: 50,
  speedR: 0.0,
  speedG: 5,
  dr: 11, // 25,
  rStart: 0,
  rEnd: 375,
  alpha: 100,
} as GoldenSpiralUserParam;

export interface GoldenSpiralParam extends AnimationParam {
  aStartR: number,
  aStartG: number,
}
    
  