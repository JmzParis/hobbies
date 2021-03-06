export interface Player {
  playerId: number;
  name: string;
  avatar: string;
  backgroundColor: string;
  //
  isActive: boolean;
  tryCount: number;
  trivialCount: number;
  foundCount: number;
  foundPercent: number;
  failedCount: number;
  isWinner: boolean;
  timerTickCount: number;  
}
export const defaultPlayer: Player = {
  playerId: -1,
  name: '',
  avatar: '',
  backgroundColor: '',
  //
  isActive: true,
  tryCount: 0,
  trivialCount: 0,
  foundCount: 0,
  foundPercent: 0,
  failedCount: 0,
  isWinner: false,
  timerTickCount: 0,
};

export const resetPlayer = { ...defaultPlayer, tryCount: 0, failedCount: 0 };
export const defaultInactivePlayer = { ...defaultPlayer, isActive: false };
