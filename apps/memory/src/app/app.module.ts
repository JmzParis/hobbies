import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MemoryFeatureBoardgameModule,
  memoryFeatureBoardgameModuleRoutes,
} from '@hobbies/memory/feature-boardgame';
import { AppComponent } from './app.component';

const memoryAppRoutes: Routes = [
  { path: '', redirectTo: '/memory', pathMatch: 'full' },
  { path: 'memory', children: memoryFeatureBoardgameModuleRoutes },
  //{ path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MemoryFeatureBoardgameModule,
    RouterModule.forRoot(memoryAppRoutes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
