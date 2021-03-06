
export interface Card {
  image: string;
  imagePath: string;
  imageType: string;
  width: number;
  refresh: () => void;
  isFlipped: boolean;
  wasFlipOnce: boolean;
  isWrong: boolean;
  isTrivial: boolean;
  isFound: boolean;
  foundByPlayerId: number;
  isReset: boolean;
}

export const initCard = {
  image: '',
  imagePath: '',
  imageType: '',
  width: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh: () => { },
  isFlipped: false,
  wasFlipOnce: false,
  isWrong: false,
  isTrivial: false,
  isFound: false,
  foundByPlayerId: -1,
  isReset: false,
} as Card;

export const resetCard: Card = {...initCard, isReset: true};
