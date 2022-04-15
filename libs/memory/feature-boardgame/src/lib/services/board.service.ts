import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { CardmixerService } from './cardmixer.service';
import { FlipService } from './flip.service';
import { Card, initCard } from '../model/card';
import { SoundService } from './sound.service';
import { Config, defaultConfig } from '../model/config';
import { defaultInactivePlayer, defaultPlayer, Player } from '../model/player';
import { dummyGameConf, GameConf } from '../model/gameconf';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private cards: Card[] = [];
  public cardWidth = 0;

  private readonly gameConfSubject = new BehaviorSubject<GameConf>(
    dummyGameConf
  );
  public gameConf$ = this.gameConfSubject.asObservable();

  private readonly playersSubject = new BehaviorSubject<Player[]>([
    defaultPlayer,
  ]);
  public players$ = this.playersSubject.asObservable();
  private timer: Subscription = new Subscription();
  private gameConf: GameConf = dummyGameConf;

  constructor(
    private flipService: FlipService,
    private mixer: CardmixerService,
    private sound: SoundService
  ) {
    this.init(defaultConfig);
  }

  public init(conf: Config): void {
    // console.log(`BoardService.init(${conf.columnCount})`);
    this.flipService.reset();
    const gameConf = this.buildGameConf(conf);
    this.cards = gameConf.cards;
    this.gameConf = gameConf;
    // console.log('gameConfSubject.next(gameConf)');
    this.gameConfSubject.next(gameConf);
  }

  private buildGameConf(conf: Config): GameConf {
    const gameConf: GameConf = {
      ...dummyGameConf,
      config: conf,
    };
    // return every card
    for (const card of gameConf.cards) {
      card.isFlipped = false;
      card.refresh();
    }

    this.buildPlayers(gameConf, conf);
    this.onPlayerUpdate(gameConf.players);
    const cardsCount = conf.columnCount ** 2; // board = columnCount x columnCount
    this.sound.playCardPlace(cardsCount);
    const pairCount = cardsCount / 2;
    this.flipService.init(
      pairCount,
      gameConf,
      this.onPlayerUpdate.bind(this),
      this.onCompleted.bind(this)
    );
    this.mixer.shuffle(pairCount);
    const minDim =
      window.innerHeight < window.innerWidth
        ? window.innerHeight
        : window.innerWidth;
    this.cardWidth = (minDim * 0.86) / conf.columnCount;

    const cards = Array(cardsCount);
    for (let cardId = 0; cardId < cardsCount; cardId++) {
      cards[cardId] = this.buildCard(cardId, this.cardWidth);
    }

    gameConf.cards = cards;
    return gameConf;
  }

  private buildCard(cardId: number, width: number): Card {
    const location = this.mixer.getCard(cardId);
    return {
      ...initCard,
      imagePath: location.path,
      image: location.name,
      imageType: location.type,
      width,
    } as Card;
  }

  private buildPlayers(gameConf: GameConf, conf: Config): void {
    gameConf.players = Array(conf.playerCount);
    gameConf.players[0] = { ...defaultPlayer };
    for (let playerId = 1; playerId < conf.playerCount; playerId++) {
      gameConf.players[playerId] = { ...defaultInactivePlayer };
    }
    for (let playerId = 0; playerId < conf.playerCount; playerId++) {
      const player = gameConf.players[playerId];
      player.playerId = playerId;
      player.name = conf.players[playerId].name;
      player.avatar = conf.players[playerId].avatar;
    }
    gameConf.currentPlayerId = 0;

    if (!this.timer.closed) this.timer.unsubscribe();
    if (gameConf.config.game.useTimer)
      this.timer = timer(1000, 1000).subscribe((t) => this.timerTick(t));
  }

  private timerTick(t: number): void {
    this.gameConf.players[this.gameConf.currentPlayerId].timerTickCount++;
    this.onPlayerUpdate(this.gameConf.players);
  }

  public check(cardId: number): void {
    const card = this.cards[cardId];
    this.flipService.check(card);
  }

  public onPlayerUpdate(players: Player[]): void {
    // console.log('playersSubject.next(players)');
    this.playersSubject.next(players);
  }

  public onCompleted(): void {
    if (!this.timer.closed) this.timer.unsubscribe();
  }
}
