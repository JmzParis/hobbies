import { AnimationParam, UserParam, defaultUserParam } from '../../services/scene-model';

export interface SwarmUserParam extends UserParam {
  familyCount: number;
  familySize: number,
  gravity: number,
}

export const defaultSwarmUserParam = {
  ...defaultUserParam,
  bgMode: 3, //  with white
  familyCount: 6,
  familySize: 15,
  gravity: 0.45,
};

export interface SwarmParam extends AnimationParam {
  stuff: number;
}
  

