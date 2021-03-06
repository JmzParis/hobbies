
export interface VisualConfig {
  backgroundColorWhenFound: boolean;
  redBackgroundWhenNotFound: boolean;
}
export const defaultVisualConfig: VisualConfig = {
  backgroundColorWhenFound: true,
  redBackgroundWhenNotFound: true,
};

export interface SoundConfig {
  flipCardSound: boolean;
  foundSound: boolean;
  winSound: boolean;
  noSound: boolean;
}
export const defaultSoundConfig: SoundConfig = {
  flipCardSound: true,
  foundSound: true,
  winSound: true,
  noSound: false,
};

export interface GameConfig {
  ifFoundContinue: boolean;
  useTimer: boolean;
}
export const defaultGameConfig: GameConfig = {
  ifFoundContinue: true,
  useTimer: true,
};

export interface PlayerConfig {
  name: string;
  avatar: string;
  backgroundColor: string;
}

export const playerId0Config: PlayerConfig = {
  name: 'YogiParesseux',
  avatar: 'https://image.freepik.com/vecteurs-libre/illustration-icone-dessin-anime-mignon-paresseux-yoga_138676-2250.jpg',
  // https://static.thenounproject.com/png/3678-200.png',
  //
  // eslint-disable-next-line max-len
  // https://image.freepik.com/vecteurs-libre/illustration-icone-vecteur-dessin-anime-mignon-tasse-cafe-heureux-boire-concept-icone-caractere-style-bande-dessinee-plat_138676-2587.jpg
  // https://image.freepik.com/vecteurs-libre/avatar-visage-monstre-cartoon-monstre-halloween_6996-1164.jpg
  // https://image.freepik.com/vecteurs-libre/avatar-visage-monstre-cartoon-monstre-halloween_6996-1120.jpg
  backgroundColor: 'darkcyan',
};
export const playerId1Config: PlayerConfig = {
  name: 'CoffeCup',
  // eslint-disable-next-line max-len
  avatar: 'https://image.freepik.com/vecteurs-libre/illustration-icone-vecteur-dessin-anime-mignon-tasse-cafe-heureux-boire-concept-icone-caractere-style-bande-dessinee-plat_138676-2587.jpg',
  // 'https://cdn.iconscout.com/icon/premium/png-512-thumb/brain-memory-2067635-1744770.png',
  // eslint-disable-next-line max-len
  // https://image.freepik.com/vecteurs-libre/illustration-icone-vecteur-dessin-anime-mignon-tasse-cafe-heureux-boire-concept-icone-caractere-style-bande-dessinee-plat_138676-2587.jpg
  backgroundColor: '#DD9999',
};
export interface Config {
  columnCount: number;
  playerCount: number;
  flipDelay: number;
  sound: SoundConfig;
  visual: VisualConfig;
  game: GameConfig;
  players: PlayerConfig[];
}

export const defaultConfig: Config = {
  columnCount: 4,
  playerCount: 1,
  flipDelay: 2,
  sound: defaultSoundConfig,
  visual: defaultVisualConfig,
  game: defaultGameConfig,
  players: [playerId0Config, playerId1Config],
};

