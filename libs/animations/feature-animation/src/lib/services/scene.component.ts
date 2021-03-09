import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

import { AnimationService } from '@hobbies/shared/util-drawing';
import { DrawService, SceneService } from './scene.service';
import { UserParam } from './scene-param';

@Component({
  selector: 'jz-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SceneService],
})
export class SceneComponent implements AfterViewInit, OnDestroy {
  @Input() paramTemplate!: TemplateRef<unknown>;
  @Input() userParam!: UserParam;  
  @Input() drawService!: DrawService;
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
    private sceneService: SceneService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private elmRef: ElementRef
  ) {}

  initStopObservable() {
    this.stopSubject = new Subject<boolean>();
    this.stop$ = this.stopSubject.asObservable();
  }

  ngAfterViewInit(): void {  
    if(!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.sceneService.init(canvasContext, this.drawService, this.userParam);
    this.screenSize = `Window: ${window.innerWidth}x${window.innerHeight}, canvas: ${canvas.width}x${canvas.height}`;

    this.onStart();
  }

  onStart(): void {
    // this.ngZone.runOutsideAngular(() => {
    this.initStopObservable();
    this.animationService.animate(this.stop$, this.draw.bind(this));
    // });
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

  @HostListener('window:resize')
  onResize() {
    this.sceneService.resize();
  }

  ngOnDestroy() {
    this.stopSubject.next(true);
    this.stopSubject.complete();
    this.delaySubject.complete();
    this.fpsSubject.complete();
  }
}
