import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'jz-cardboard',
  templateUrl: './cardboard.component.html',
  styleUrls: ['./cardboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardboardComponent {
  gameConf$ = this.board.gameConf$;
  constructor(public board: BoardService) { }
}
