import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BoardLayoutComponent } from './board-layout/board-layout.component';
import { CardboardComponent } from './components/cardboard/cardboard.component';
import { CardComponent } from './components/card/card.component';
import { PlayerScoreComponent } from './components/player-score/player-score.component';
import { GameConfComponent } from './components/game-conf/game-conf.component';
import { BoardWoConfLayoutComponent } from './board-wo-conf-layout/board-wo-conf-layout.component';

export const memoryFeatureBoardgameModuleRoutes: Routes = [
  //{ path: '', redirectTo: '/memory-home', pathMatch: 'full' },
  { path: '', pathMatch: 'full', component: BoardLayoutComponent },
  { path: 'configuration', component: GameConfComponent },
  { path: 'board', component: BoardWoConfLayoutComponent },
  /*
  { path: '**', redirectTo: '/home' }
  */
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(memoryFeatureBoardgameModuleRoutes),
  ],
  declarations: [
    BoardLayoutComponent,
    BoardWoConfLayoutComponent,
    CardboardComponent,
    CardComponent,
    PlayerScoreComponent,
    GameConfComponent,
  ],
  exports: [BoardLayoutComponent],
})
export class MemoryFeatureBoardgameModule {}
