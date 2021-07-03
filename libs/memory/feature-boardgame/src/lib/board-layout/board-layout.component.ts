import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Config } from '../model/config';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'jz-board-layout',
  templateUrl: './board-layout.component.html',
  styleUrls: ['./board-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardLayoutComponent {
  displayConfig = true;
  gameConf$ = this.board.gameConf$;

  constructor(private readonly board: BoardService) {}

  onConfigClosed(config: Config): void {
    this.displayConfig = false;
    this.board.init(config);
  }
}
