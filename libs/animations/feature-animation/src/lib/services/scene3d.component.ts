import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

import { AnimationService } from '@hobbies/shared/util-drawing';
import { Draw3dService, UserParam } from './scene-model';
import { Scene3dService } from './scene3d.service';
import { Scene3dRotationService } from './scene3drotation.service';
import { SceneControlService } from './scene-control.service';
import { ParamDirective } from './param.directive';

@Component({
  selector: 'jz-scene3d',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Scene3dService, Scene3dRotationService],
})
export class Scene3dComponent implements AfterViewInit, OnDestroy {
  @Input() userParam!: UserParam;
  @Input() drawService!: Draw3dService;
  @Input() controlService!: SceneControlService;
  @ViewChild('canvas') canvasRef!: ElementRef;
  @ContentChild(ParamDirective) paramDirective!: ParamDirective;

  private stopSubject = new Subject<boolean>();
  private stop$ = this.stopSubject.asObservable();

  leftSidebarVisible = false;

  constructor(
    private animationService: AnimationService,
    private sceneService: Scene3dService,
    private sceneRotationService: Scene3dRotationService,
    private ngZone: NgZone
  ) {}

  initStopObservable() {
    this.stopSubject = new Subject<boolean>();
    this.stop$ = this.stopSubject.asObservable();
  }

  ngAfterViewInit(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    this.sceneRotationService.init(canvas);
    this.sceneService.init(
      canvas,
      this.drawService,
      this.userParam,
      this.sceneRotationService
    );

    this.controlService.init(
      this.onRandom.bind(this),
      this.onRestart.bind(this),
      this.onStop.bind(this),
      this.onStart.bind(this)
    );

    this.onStart();
  }

  onRandom(): void {
    if (this.paramDirective) {
      this.paramDirective.onRandom();
      this.paramDirective.onRefresh();
    }
  }

  onStart(): void {
    // Run this outside angular zones,
    // While drawing frame by frame no need of
    // Angular view checks or changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      this.initStopObservable();
      if (document.readyState !== 'loading') {
        this.animationService.animate(this.stop$, this.draw.bind(this));
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.animationService.animate(this.stop$, this.draw.bind(this));
        });
      }
      this.sceneRotationService.addEventListeners();
      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  private draw(delay: number): void {
    this.controlService.processDelayForFps(delay);
    this.sceneService.draw(delay);
  }

  onStop(): void {
    this.stopSubject.next(true);
    this.stopSubject.complete();
  }

  onRestart(): void {
    this.onStop();
    this.sceneService.restart();
    this.onStart();
  }

  /*
  @HostListener('window:resize')
  onResize() {
    this.sceneService.resize();
  }
  */

  resize() {
    this.sceneRotationService.resize();
    this.sceneService.resize();
  }

  ngOnDestroy() {
    this.stopSubject.next(true);
    this.stopSubject.complete();
  }
}
