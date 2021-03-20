import { Animation3dParam, defaultUserParam, UserParam } from '../../services/scene-model';

export interface TorusUserParam extends UserParam {
  r1: number;
  s1: number;
  r2: number;
  s2: number;
  scale: number;
  segments: number;
  radius: number;
  radialDivision: number;
}

export const defaultTorusUserParam = {
  ...defaultUserParam,
  r1: 6,
  s1: 1,
  r2: 1,
  s2: 33,
  scale: 1,
  segments: 600,
  radius: 0.5,
  radialDivision: 10,
} as TorusUserParam;

export interface TorusParam extends Animation3dParam {
  stuff: number;
}
  

