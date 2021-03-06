import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AnimationsFeatureAnimationModule,
  animationsFeatureAnimationModuleRoutes,
} from '@hobbies/animations/feature-animation';
import { AppComponent } from './app.component';

const animationsAppRoutes: Routes = [
  { path: '', redirectTo: '/animations', pathMatch: 'full' },
  { path: 'animations', children: animationsFeatureAnimationModuleRoutes },
  // { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AnimationsFeatureAnimationModule,
    RouterModule.forRoot(animationsAppRoutes, { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
