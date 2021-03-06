import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';

const appRoutes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', pathMatch: 'full', component: HomePageComponent },
  {
    path: 'memory',
    loadChildren: () =>
      import('@hobbies/memory/feature-boardgame').then(
        (module) => module.MemoryFeatureBoardgameModule
      ),
  },
  {
    path: 'animations',
    loadChildren: () =>
      import('@hobbies/animations/feature-animation').then(
        (module) => module.AnimationsFeatureAnimationModule
      ),
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,

    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
     // enableTracing: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
