import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export interface SceneControl {
  onRandom(): void;
  onRestart(): void;
  onStop(): void;
}

@Injectable({
  providedIn: 'root',
})
export class SceneControlService implements SceneControl, OnDestroy {
  private delaySubject = new Subject<number>();
  public delay$ = this.delaySubject.asObservable();
  private fpsSubject = new Subject<number>();
  public fps$ = this.fpsSubject.asObservable();
  private lastDelay = 0;
  private fpsAcc = new Array<number>(10);
  private fpsIndex = 0;
  public isInit = false;
  isRandomDisplayed = true;
  isRestartDisplayed = true;
  isStopStartDisplayed = true;

  onRandom!: () => void;
  onRestart!: () => void;
  onStop!: () => void;
  onPlay!: () => void;

  init(
    onRandom: () => void,
    onRestart: () => void,
    onStop: () => void,
    onPlay: () => void
  ) {
    this.onRandom = onRandom;
    this.onRestart = onRestart;
    this.onStop = onStop;
    this.onPlay = onPlay;
  }

  display(
    isRandomDisplayed: boolean,
    isRestartDisplayed: boolean,
    isStopStartDisplayed: boolean
  ): void {
    this.isRandomDisplayed = isRandomDisplayed;
    this.isRestartDisplayed = isRestartDisplayed;
    this.isStopStartDisplayed = isStopStartDisplayed;
    this.isInit = true;
  }

  processDelayForFps(delay: number) {
    const diff = delay - this.lastDelay;
    this.fpsIndex = (this.fpsIndex + 1) % 10;
    this.fpsAcc[this.fpsIndex] = diff;
    const smoothDiff = this.fpsAcc.reduce((a, b) => a + b) / 10;
    this.delaySubject.next(smoothDiff << 0);
    this.fpsSubject.next((1000 / smoothDiff) << 0);
    this.lastDelay = delay;
  }

  ngOnDestroy(): void {
    this.delaySubject.complete();
    this.fpsSubject.complete();
  }
}
