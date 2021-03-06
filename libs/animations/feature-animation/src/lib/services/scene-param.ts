export const confColorModes = [
  { value: 1, title: 'Mode1' },
  { value: 2, title: 'Mode2' },
  { value: 3, title: 'Mode3' },
  { value: 4, title: 'Mode4' },
  { value: 5, title: 'Red' },
  { value: 6, title: 'Green' },
  { value: 7, title: 'Blue' },
  { value: 8, title: 'Grey' },
  { value: 9, title: 'Orange' },
  { value: 10, title: 'EmptyCircles' },
  { value: 11, title: 'FullCircles' },
];

export const confBackgroundModes = [
  { value: 0, title: 'Init-Black' },
  { value: 1, title: 'Init-White' },
  { value: 2, title: 'Black' },
  { value: 3, title: 'White' },
  { value: 4, title: 'Gradient' },
  { value: 5, title: 'Alpha 20%' },
  { value: 6, title: 'Alpha 7%' },
  { value: 7, title: 'Alpha 3%' },
  { value: 8, title: 'AlphaX' },
];

export const confDrawings = [
  { value: 'circle', title: 'Circles' },
  { value: 'leaf', title: 'Leafs' },
  { value: 'triangle', title: 'Triangles' },
  { value: 'square', title: 'Squares' },
];

export interface UserParam {
  bgMode: number;
  colorMode: number;
}
export const defaultUserParam = {
  bgMode: 8,
  colorMode: 2,
} as UserParam;

export interface AnimationParam {
  centerx: number;
  centery: number;
  canvasContext: CanvasRenderingContext2D;
  userParam: UserParam;
}
