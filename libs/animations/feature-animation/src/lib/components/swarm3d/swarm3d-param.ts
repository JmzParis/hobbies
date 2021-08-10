import {
  AnimationParam,
  defaultUserParam,
  UserParam,
} from '../../services/scene-model';

export interface Swarm3dUserParam extends UserParam {
  gravity: number;

  corpsCount: number;

  sunCount: number;
  sunMass: number;

  maxMass: number;
  radiusMax: number;
  radiusMin: number;
  zSpread: number;
}

export const defaultSwarm3dUserParam = {
  ...defaultUserParam,

  gravity: 0.000001,

  corpsCount: 15,

  sunCount: 1,
  sunMass: 1000000,

  maxMass: 100,
  radiusMax: 10,
  radiusMin: 5,
  zSpread: 5,
} as Swarm3dUserParam;

export interface Swarm3dParam extends AnimationParam {
  stuff: number;
}
