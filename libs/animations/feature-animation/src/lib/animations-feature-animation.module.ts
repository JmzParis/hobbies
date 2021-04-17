import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedUtilKineticModule } from '@hobbies/shared/util-kinetic';
import { SharedUtilDrawingModule } from '@hobbies/shared/util-drawing';
import { SharedUtilPotModule } from '@hobbies/shared/util-pot';

import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

import { SceneComponent } from './services/scene.component';
import { AnimationsLayoutComponent } from './animations-layout/animations-layout.component';
import { ReactiveColumnDirective } from './sharable/reactive-column.directive';

import { GoldenDoubleSpiralComponent } from './components/golden-spiral/golden-double-spiral.component';
import { GoldenSpiralComponent } from './components/golden-spiral/golden-spiral.component';
import { GoldenSpiralParamComponent } from './components/golden-spiral/golden-spiral-param.component';
import { SkinComponent } from './components/skin/skin.component';
import { SkinParamComponent } from './components/skin/skin-param.component';
import { OrbitComponent } from './components/orbit/orbit.component';
import { OrbitParamComponent } from './components/orbit/orbit-param.component';
import { SwarmComponent } from './components/swarm/swarm.component';
import { SwarmParamComponent } from './components/swarm/swarm-param.component';
import { ScrollComponent } from './components/scroll/scroll.component';
import { ScrollParamComponent } from './components/scroll/scroll-param.component';
import { HexagonComponent } from './components/hexagon/hexagon.component';
import { HexagonParamComponent } from './components/hexagon/hexagon-param.component';
import { Scene3dComponent } from './services/scene3d.component';
import { TubeComponent } from './components/tube/tube.component';
import { TubeParamComponent } from './components/tube/tube-param.component';
import { TorusComponent } from './components/torus/torus.component';
import { TorusParamComponent } from './components/torus/torus-param.component';
import { SceneControlComponent } from './services/scene-control/scene-control.component';
import { ParamDirective } from './services/param.directive';


export const animationsFeatureAnimationModuleRoutes: Routes = [
  //{ path: '', pathMatch: 'full', component: HexagonComponent },
  { path: '', pathMatch: 'full', component: AnimationsLayoutComponent },
  { path: 'spiral', component: GoldenSpiralComponent },
  { path: 'doublespiral', component: GoldenDoubleSpiralComponent },
  { path: 'orbit', component: OrbitComponent },
  { path: 'skin', component: SkinComponent },
  { path: 'swarm', component: SwarmComponent },
  { path: 'scroll', component: ScrollComponent },
  { path: 'hexagon', component: HexagonComponent },
  { path: 'tube', component: TubeComponent },
  { path: 'torus', component: TorusComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedUtilKineticModule,
    SharedUtilDrawingModule,
    SharedUtilPotModule,

    RippleModule,
    SidebarModule,
    ButtonModule,
    SliderModule,
    DropdownModule,
    CheckboxModule,
    RouterModule.forChild(animationsFeatureAnimationModuleRoutes),
  ],
  declarations: [
    AnimationsLayoutComponent,
    SceneComponent,
    Scene3dComponent,
    GoldenSpiralComponent,
    GoldenDoubleSpiralComponent,
    GoldenSpiralParamComponent,
    SkinComponent,
    SkinParamComponent,
    OrbitComponent,
    OrbitParamComponent,
    SwarmComponent,
    SwarmParamComponent,
    ScrollComponent,
    ScrollParamComponent,
    HexagonComponent,
    HexagonParamComponent,
    TubeComponent,
    TubeParamComponent,
    TorusComponent,
    TorusParamComponent,
    ReactiveColumnDirective,
    SceneControlComponent,  
    ParamDirective,  
  ],
  exports: [AnimationsLayoutComponent],
})
export class AnimationsFeatureAnimationModule {}
