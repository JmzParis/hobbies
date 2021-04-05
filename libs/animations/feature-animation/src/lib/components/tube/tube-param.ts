import { Animation3dParam, defaultUserParam, UserParam } from '../../services/scene-model';

export interface TubeUserParam extends UserParam {
  wireframe: boolean;
  segments: number;
  radius: number;
  radialDivision: number;
  rx: number;
  sx: number;
  cx: number;
  ry: number;
  sy: number;
  cy: number;
  rz: number;
  sz: number;
  cz: number;
}

export const defaultTubeUserParam = {
  ...defaultUserParam,
  wireframe: true,
  segments: 400,
  radius: 0.5,
  radialDivision: 8,
  rx: 6,
  sx: -1,
  cx: -4,
  ry: 5,
  sy: 3,
  cy: 4,
  rz: 3,
  sz: -2,
  cz: 0,
} as TubeUserParam;

export interface TubeParam extends Animation3dParam {
  stuff: number;
}
  

