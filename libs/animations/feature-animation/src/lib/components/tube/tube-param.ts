import { Animation3dParam, defaultUserParam, UserParam } from '../../services/scene-model';

export interface TubeUserParam extends UserParam {
  rx: number;
  sx: number;
  cx: number;
  ry: number;
  sy: number;
  cy: number;
  rz: number;
  sz: number;
  cz: number;
  scale: number;
  segments: number;
  radius: number;
  radialDivision: number;
}

export const defaultTubeUserParam = {
  ...defaultUserParam,
  rx: 6,
  sx: -1,
  cx: -4,
  ry: 5,
  sy: 3,
  cy: 4,
  rz: 3,
  sz: -2,
  cz: 0,
  scale: 1,
  segments: 400,
  radius: 0.5,
  radialDivision: 8,
} as TubeUserParam;

export interface TubeParam extends Animation3dParam {
  stuff: number;
}
  

