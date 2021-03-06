import { AnimationParam, defaultUserParam, UserParam } from '../../services/scene-param';


export interface OrbitUserParam extends UserParam {
  drawing: string;

  corpsCount: number;
  maxMass: number;
  //massDistribution: number,
  speedFactor: number,
  // balancing:number,
  gravity:number,
}

export const defaultOrbitUserParam = {
  ...defaultUserParam,
  drawing: 'circle',

  corpsCount: 59,
  maxMass: 8,
  speedFactor: 60,
  gravity: 0.45,
} as OrbitUserParam;

export interface OrbitParam extends AnimationParam {
  stuff: number;
}
  

