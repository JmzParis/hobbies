import { AnimationParam, defaultUserParam, UserParam } from '../../services/scene-model';

export interface SkinUserParam extends UserParam {
  radiusThreshold: number;
  dragIntensity: number,
  repulsionIntensity: number,
  repulsionZone:number,
  spotCount: number,
  ageThreshold: number,
}

export const defaultSkinUserParam = {
  ...defaultUserParam,
  radiusThreshold: 100,
  dragIntensity: 10,
  repulsionIntensity: 0.2,
  repulsionZone: 5,
  spotCount: 100,
  ageThreshold: 100,
};

export interface SkinParam extends AnimationParam {
  stuff: number;
}
  

