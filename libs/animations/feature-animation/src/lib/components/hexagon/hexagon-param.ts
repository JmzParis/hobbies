import { Animation3dParam, defaultUserParam, UserParam } from '../../services/scene-model';


export interface HexagonUserParam extends UserParam {
  drawing: string;

  corpsCount: number;
  maxMass: number;
  //massDistribution: number,
  speedFactor: number,
  // balancing:number,
  gravity:number,
}

export const defaultHexagonUserParam = {
  ...defaultUserParam,
  drawing: 'circle',

  corpsCount: 59,
  maxMass: 8,
  speedFactor: 60,
  gravity: 0.45,
} as HexagonUserParam;

export interface HexagonParam extends Animation3dParam {
  stuff: number;
}
  

