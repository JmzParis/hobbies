import { Animation3dParam, defaultUserParam, UserParam } from '../../services/scene-model';

export interface TorusUserParam extends UserParam {
  tube: boolean;
  wireframe: boolean;
  scale: number;
  segments: number;
  radius: number;
  radialDivision: number;
  r1: number;
  s1: number;
  phi: number;
  r2: number;
  s2: number;
}

export const defaultTorusUserParam = {
  ...defaultUserParam,
  tube: true,
  wireframe: true,
  scale: 1,
  segments: 800,
  radius: 0.5,
  radialDivision: 10,
  r1: 6,
  s1: 1,
  phi: 0,
  r2: 1,
  s2: 33,
} as TorusUserParam;

export interface TorusParam extends Animation3dParam {
  stuff: number;
}
  

