import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardLayoutComponent } from './board-layout/board-layout.component';
import { GameConfComponent } from './game-conf/game-conf.component';
import { CardboardComponent } from './cardboard/cardboard.component';
import { CardComponent } from './card/card.component';
import { PlayerScoreComponent } from './player-score/player-score.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BoardLayoutComponent, CardboardComponent, CardComponent, PlayerScoreComponent, GameConfComponent],
  exports: [BoardLayoutComponent],
})
export class MemoryFeatureBoardgameModule {}
