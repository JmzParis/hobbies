import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

import { AnimationService } from '@hobbies/shared/util-drawing';
import { Draw3dService, UserParam } from './scene-model';
import { Scene3dService } from './scene3d.service';
import { Scene3dRotationService } from './scene3drotation.service';

@Component({
  selector: 'jz-scene3d',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Scene3dService, Scene3dRotationService],
})
export class Scene3dComponent implements AfterViewInit, OnDestroy {
  @Input() paramTemplate!: TemplateRef<unknown>;
  @Input() userParam!: UserParam;
  @Input() drawService!: Draw3dService;
  @ViewChild('canvas') canvasRef!: ElementRef;

  private stopSubject = new Subject<boolean>();
  private stop$ = this.stopSubject.asObservable();
  private delaySubject = new Subject<number>();
  public delay$ = this.delaySubject.asObservable();
  private fpsSubject = new Subject<number>();
  public fps$ = this.fpsSubject.asObservable();
  private lastDelay = 0;
  private fpsAcc = new Array<number>(10);
  private fpsIndex = 0;

  public screenSize = '';
  leftSidebarVisible = false;

  constructor(
    private animationService: AnimationService,
    private sceneService: Scene3dService,
    private sceneRotationService: Scene3dRotationService,
    private ngZone: NgZone,
  ) {}

  initStopObservable() {
    this.stopSubject = new Subject<boolean>();
    this.stop$ = this.stopSubject.asObservable();
  }

  ngAfterViewInit(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    this.sceneRotationService.init(canvas);
    this.sceneService.init(canvas, this.drawService, this.userParam, this.sceneRotationService);
    this.screenSize = `Window: ${window.innerWidth}x${window.innerHeight}, canvas: ${canvas.width}x${canvas.height}`;

    this.onStart();
  }

  onStart(): void {
    /*
    // this.ngZone.runOutsideAngular(() => {
    this.initStopObservable();
    this.animationService.animate(this.stop$, this.draw.bind(this));
    // });
    */
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      this.initStopObservable();
      if (document.readyState !== 'loading') {
        //this.render();
        this.animationService.animate(this.stop$, this.draw.bind(this));
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          //this.render();
          this.animationService.animate(this.stop$, this.draw.bind(this));
        });
      }
      this.sceneRotationService.addEventListeners();
      window.addEventListener('resize', () => {
        this.resize();
      });
    });    
  }

  private displayFps(delay: number) {
    const diff = delay - this.lastDelay;
    this.fpsIndex = (this.fpsIndex + 1) % 10;
    this.fpsAcc[this.fpsIndex] = diff;
    const smoothDiff = this.fpsAcc.reduce((a, b) => a + b) / 10;
    this.delaySubject.next(smoothDiff << 0);
    this.fpsSubject.next((1000 / smoothDiff) << 0);
    this.lastDelay = delay;
  }

  private draw(delay: number): void {
    this.displayFps(delay);
    //this.ngZone.runOutsideAngular(() => {
    this.sceneService.draw(delay);
    //});
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
    this.delaySubject.complete();
    this.fpsSubject.complete();
  }
}
