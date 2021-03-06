import { ChangeDetectorRef, Input } from '@angular/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, tap, filter} from 'rxjs/operators';
import { BoardService } from '../../services/board.service';
import { Card, initCard } from '../../model/card';

@Component({
  selector: 'jz-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() cardId = -1;

  card$ = this.boardService.gameConf$.pipe(
      filter(gameConf => this.cardId < gameConf.cards.length),
      map(gameConf => gameConf.cards[this.cardId]),
      tap(card => card.refresh = this.refresh.bind(this)),
      tap(card => this.card = card),
      // tap(card => console.log(`card$=${ JSON.stringify(card)}`))
    );
  public card: Card = initCard;

  constructor(private boardService: BoardService, private cf: ChangeDetectorRef) {
  }

  private refresh(): void {
    this.cf.markForCheck(); // force OnPush refresh
  }

  onClick(): void {
    // console.log(`calling boardService.check(${this.cardId})`);
    this.boardService.check(this.cardId);
  }
}

