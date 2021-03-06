import { defaultPlayer, Player } from './player';
import { Config, defaultConfig } from './config';
import { Card } from './card';

export interface GameConf {
  config: Config;
  cards: Card[];
  players: Player[];
  currentPlayerId: number;
}

export const dummyGameConf: GameConf = {
  config: defaultConfig,
  cards: [],
  players: [defaultPlayer],
  currentPlayerId: 0,
};
