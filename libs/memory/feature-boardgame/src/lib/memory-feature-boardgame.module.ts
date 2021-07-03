import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';

import { BoardLayoutComponent } from './board-layout/board-layout.component';
import { CardboardComponent } from './components/cardboard/cardboard.component';
import { CardComponent } from './components/card/card.component';
import { PlayerScoreComponent } from './components/player-score/player-score.component';
import { GameConfComponent } from './components/game-conf/game-conf.component';

export const memoryFeatureBoardgameModuleRoutes: Routes = [
  //{ path: '', redirectTo: '/memory-home', pathMatch: 'full' },
  { path: '', pathMatch: 'full', component: BoardLayoutComponent },
  /*
  { path: '**', redirectTo: '/home' }
  */
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    RippleModule,
    SidebarModule,
    ButtonModule,
    SliderModule,
    DropdownModule,
    CheckboxModule,
    DialogModule,
    TabViewModule,
    InputTextModule,

    RouterModule.forChild(memoryFeatureBoardgameModuleRoutes),
  ],
  declarations: [
    CardComponent,
    CardboardComponent,
    PlayerScoreComponent,
    GameConfComponent,
    BoardLayoutComponent,
  ],
  exports: [BoardLayoutComponent],
})
export class MemoryFeatureBoardgameModule {}
