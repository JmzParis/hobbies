import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MemoryFeatureBoardgameModule } from '@hobbies/memory/feature-boardgame';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MemoryFeatureBoardgameModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
