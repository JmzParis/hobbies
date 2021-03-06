import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
//import { tap } from 'rxjs/operators';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'jz-player-score',
  templateUrl: './player-score.component.html',
  styleUrls: ['./player-score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerScoreComponent {
  @Input() playerId = -1;

  player$ = this.board.players$.pipe(
    map(players => players[this.playerId]),
    // tap(player => console.log(`player=${ JSON.stringify(player)}`))
    );

  constructor(public board: BoardService) { }
}
