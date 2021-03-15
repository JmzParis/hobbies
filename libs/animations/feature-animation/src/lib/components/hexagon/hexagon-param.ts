import { Animation3dParam, defaultUserParam, UserParam } from '../../services/scene-model';


export interface HexagonUserParam extends UserParam {
  concentricHexaCount: number;
}

export const defaultHexagonUserParam = {
  ...defaultUserParam,
  concentricHexaCount: 2,

} as HexagonUserParam;

export interface HexagonParam extends Animation3dParam {
  stuff: number;
}
  

