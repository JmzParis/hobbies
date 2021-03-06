import { AnimationParam, defaultUserParam, UserParam } from '../../services/scene-param';

export interface ScrollUserParam extends UserParam {
  imgBack: number;
  backHorizSpeed: number,
  backVertSpeed: number,
  imgFront:number,
  frontHorizSpeed: number,
  frontVertSpeed: number,
}

export const defaultScrollUserParam = {
  ...defaultUserParam,
  imgBack: 4,
  backHorizSpeed: 4,
  backVertSpeed: 1,
  imgFront: 23,
  frontHorizSpeed: -1,
  frontVertSpeed: 1,
};

export interface ScrollParam extends AnimationParam {
  stuff: number;
}