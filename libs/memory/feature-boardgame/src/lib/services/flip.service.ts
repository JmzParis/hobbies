import { Injectable } from '@angular/core';
import { Subject, interval, Observable } from 'rxjs';
import { bufferCount, map, tap, delayWhen } from 'rxjs/operators';
import { Card, resetCard } from '../model/card';
import { SoundService } from './sound.service';
import { Player } from '../model/player';
import { dummyGameConf, GameConf } from '../model/gameconf';

interface CardCouple {
  c1: Card;
  c2: Card;
  isFound: boolean;
  isTrivial: boolean;
  isReset: boolean;
}

type PlayersUpdateCallback = (n: Player[]) => void;
type BoardCompletedCallback = () => void;

@Injectable({
  providedIn: 'root',
})
export class FlipService {
  constructor(private sound: SoundService) {}
  private cardsSubject = new Subject<Card>();
  private cards$ = this.cardsSubject.asObservable();
  private cardlock = false;
  private gameConf: GameConf = dummyGameConf;
  private maxPairToWin = 0;
  private foundCount = 0;
  private isComplete = false;

  readonly cardCouple$ = this.cards$
    .pipe(
      // Stack cards by flipped pair
      bufferCount(2),
      // Forbid another card from beeing flipped before the end of current pair process
      tap((x) => (this.cardlock = true)),
      // Build a CardCouple that will hold the pair status
      map(([c1, c2]) => this.buildCouple(c1, c2)),
      // delay if not found so that player can see for himself without visual aid
      delayWhen((couple) =>
        this.intervalIf(couple.isReset || couple.isFound, 600)
      ),
      // Change card display and player scode according to success
      tap((couple) => this.analysis(couple)),
      // Wait flipDelay seconds if not found so that user can memorize the card before flipping them back
      delayWhen((couple) =>
        this.intervalIf(couple.isReset || couple.isFound, 400)
      ),
      // Ready for next move
      tap((couple) => this.readyForNext(couple))
    )
    .subscribe(); // as Observable<CardCouple>;

  private playersUpdatedCallback: PlayersUpdateCallback = (x) => {
    console.log('JMZ TODO Remove playersUpdatedCallback');
  };
  private boardCompletedCallback: BoardCompletedCallback = () => {
    console.log('JMZ TODO Remove boardCompletedCallback');
  };

  private readyForNext(couple: CardCouple): void {
    this.updateCoupleCards(couple);
    this.coupleWrongDisplay(couple, false);
    if (
      !(
        (this.gameConf.config.game.ifFoundContinue && couple.isFound) ||
        couple.isReset
      )
    ) {
      if (!this.isComplete) {
        this.changePlayer();
      }
    }
    this.cardlock = false;
  }

  private analysis(couple: CardCouple): void {
    const redBackground =
      this.gameConf.config.visual.redBackgroundWhenNotFound && !couple.isFound;
    this.coupleWrongDisplay(couple, redBackground);

    if (!couple.isReset) {
      if (couple.isFound) {
        this.foundCount++;
        this.isComplete = this.foundCount === this.maxPairToWin;
        if (this.isComplete) this.boardCompletedCallback();
      }

      this.updatePlayerScore(couple);
    }
  }

  private updatePlayerScore(couple: CardCouple): void {
    const currentPlayerId = this.gameConf.currentPlayerId;
    const upgradedPlayer = this.newPlayerState(
      this.gameConf.players[currentPlayerId],
      couple
    );
    const newPlayers = [...this.gameConf.players];
    newPlayers[currentPlayerId] = upgradedPlayer;

    if (this.isComplete) {
      this.sound.playCardWinning();
      const maxFound = Math.max(...newPlayers.map((p) => p.foundCount));
      newPlayers.map((p) => {
        const isWinner = p.foundCount === maxFound;
        p.isWinner = isWinner;
        p.isActive = isWinner;
      });
    }

    this.gameConf.players = newPlayers;
    this.playersUpdatedCallback(newPlayers);
  }

  private changePlayer(): void {
    const currentPlayerId = this.gameConf.currentPlayerId;
    const nextPlayerId =
      (currentPlayerId + 1) % this.gameConf.config.playerCount;

    // console.log(`Change playerId = ${currentPlayerId} -> ${nextPlayerId}`);
    this.gameConf.currentPlayerId = nextPlayerId;

    const newPlayers = [...this.gameConf.players];
    newPlayers.map((p, i) => {
      p.isActive = nextPlayerId === i;
    });
    this.gameConf.players = newPlayers;
    this.playersUpdatedCallback(newPlayers);
  }

  private updateCoupleCards(couple: CardCouple): void {
    return couple.isReset
      ? this.coupleResetRecieved(couple)
      : couple.isFound
      ? this.coupleFound(couple)
      : this.coupleNotFound(couple);
  }

  private newPlayerState(player: Player, couple: CardCouple): Player {
    const foundCount = couple.isFound
      ? player.foundCount + 1
      : player.foundCount;
    return {
      ...player,
      tryCount: player.tryCount + 1,
      trivialCount: couple.isTrivial
        ? player.trivialCount + 1
        : player.trivialCount,
      foundCount,
      foundPercent: (100 * foundCount) / this.maxPairToWin,
      failedCount: !couple.isFound
        ? player.failedCount + 1
        : player.failedCount,
    } as Player;
  }

  private intervalIf(predicate: boolean, delay: number): Observable<number> {
    return interval(predicate ? 0 : this.gameConf.config.flipDelay * delay);
  }

  private buildCouple(c1: Card, c2: Card): CardCouple {
    const isFound = !(c1.isReset || c2.isReset) && c1.image === c2.image;
    const result = {
      c1,
      c2,
      isFound,
      isReset: c1.isReset || c2.isReset,
      isTrivial: isFound && !c1.wasFlipOnce && !c2.wasFlipOnce,
    } as CardCouple;
    c1.wasFlipOnce = true;
    c2.wasFlipOnce = true;
    return result;
  }

  public init(
    maxPairToWin: number,
    gameConf: GameConf,
    playersUpdatedCallback: PlayersUpdateCallback,
    boardCompletedCallback: BoardCompletedCallback
  ): void {
    this.maxPairToWin = maxPairToWin;
    this.gameConf = gameConf;
    this.foundCount = 0;
    this.isComplete = false;
    this.playersUpdatedCallback = playersUpdatedCallback;
    this.boardCompletedCallback = boardCompletedCallback;
  }

  public reset(): void {
    if (this.cardlock) {
      this.cardsSubject.next(resetCard);
    } else {
      this.cardsSubject.next(resetCard);
      this.cardsSubject.next(resetCard);
    }
  }

  private coupleFound(couple: CardCouple): void {
    if (!this.isComplete) {
      this.sound.playCardFound();
    }
    this.cardsApply(couple, (c: Card) => {
      c.isFound = true;
      if (this.gameConf.config.visual.backgroundColorWhenFound) {
        c.foundByPlayerId = this.gameConf.currentPlayerId;
      }
      c.refresh();
    });
  }

  private coupleNotFound(couple: CardCouple): void {
    this.cardsApply(couple, (c: Card) => {
      c.isFlipped = false;
      c.refresh();
    });
  }

  private coupleResetRecieved(couple: CardCouple): void {
    this.cardsApply(couple, (c: Card) => {
      c.isFlipped = false;
      c.refresh();
    });
  }

  private coupleWrongDisplay(couple: CardCouple, isWrong: boolean): void {
    this.cardsApply(couple, (c: Card) => {
      c.isWrong = isWrong;
      c.refresh();
    });
  }

  private cardsApply(couple: CardCouple, method: (c: Card) => void): void {
    method(couple.c1);
    method(couple.c2);
  }

  public check(card: Card): void {
    if (!this.cardlock && !card.isFlipped) {
      card.isFlipped = !card.isFlipped;
      card.refresh();
      this.sound.playCardFlip();
      console.log(`check card=${JSON.stringify(card)}`);
      this.cardsSubject.next(card);
    }
  }
}
