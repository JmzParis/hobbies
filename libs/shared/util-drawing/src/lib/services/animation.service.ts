import { Injectable } from '@angular/core';
import { animationFrameScheduler, defer, Observable, scheduled } from 'rxjs';
import { map, takeUntil, repeat } from 'rxjs/operators';

const timeAgo = (scheduler = animationFrameScheduler) => {
  return defer(() => {
    const start = scheduler.now();
    return scheduled([0], scheduler).pipe(
      repeat(),
      map(() => scheduler.now() - start)
    );
  });
};
@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  public animate(
    stop$: Observable<boolean>,
    draw: (delay: number) => void
  ): void {
    timeAgo()
      .pipe(takeUntil(stop$))
      .subscribe((ms) => draw(ms));
  }
}
