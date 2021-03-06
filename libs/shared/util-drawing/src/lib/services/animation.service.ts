import { Injectable } from '@angular/core';
import { animationFrameScheduler, defer, interval, Observable } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';

const timeAgo = (scheduler = animationFrameScheduler) => {
  return defer(() => {
    const start = scheduler.now();
    return interval(0, scheduler).pipe(
      map(() => scheduler.now() - start)
    );
  });
};

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  public animate( stop$: Observable<boolean>, draw: (delay:number)=>void): void {
    timeAgo().pipe(
      tap(ms => draw(ms)), 
      takeUntil(stop$)
      ).subscribe();
  }
}
