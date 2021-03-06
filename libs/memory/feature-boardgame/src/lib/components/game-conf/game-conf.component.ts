import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Config, defaultConfig } from '../../model/config';
import { FlipService } from '../../services/flip.service';

@Component({
  selector: 'jz-game-conf',
  templateUrl: './game-conf.component.html',
  styleUrls: ['./game-conf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameConfComponent {

  public selectedSize = 2;
  public sizes = [
    {value: 2, title: '2x2   Baby'},
    {value: 4, title: '4x4   Child'},
    {value: 6, title: '6x6   Beginner'},
    {value: 8, title: '8x8   Intermediate'},
    {value: 10, title: '10x10 Advanced'},
    {value: 12, title: '12x12 Master'},
    {value: 14, title: '14x14 Elephant'},
    {value: 16, title: '16x16 Beyond'},
  ];

  public selectedPlayerCount = 1;
  public playerCounts = [
    {value: 1, title: '1 Solo'},
    {value: 2, title: '2 Duo'},
  ];

  public selectedFlipDelay = 2;
  public flipDelays = [
    {value: 0.5, title: '0.5 s'},
    {value: 1, title: '1.0 s'},
    {value: 1.5, title: '1.5 s'},
    {value: 2, title: '2.0 s'},
    {value: 3, title: '3.0 s'},
  ];

  constructor(
    public board: BoardService,
    public flipService: FlipService) { }

  public config: Config = defaultConfig;

  reset( columnCount: number, playerCount: number, flipDelay: number ): void {
    const config: Config = {...this.config,
      columnCount,
      playerCount,
      flipDelay
    };
    this.board.init(config);
    this.config = config;
  }

}
