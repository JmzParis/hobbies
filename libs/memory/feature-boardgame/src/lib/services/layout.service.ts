import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BreakpointsService } from './breakpoints.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  activeBreakpoints: string[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private breakpointService: BreakpointsService
  ) {}

  subscribeToLayoutChanges(): Observable<string[]> {
    return this.breakpointObserver
      .observe(this.breakpointService.getBreakpoints())
      .pipe(map(this.parseBreakpointsResponse.bind(this)));
  }

  private parseBreakpointsResponse(breakpointState: BreakpointState): string[] {
    this.activeBreakpoints = [];

    Object.keys(breakpointState.breakpoints).map((key) => {
      if (breakpointState.breakpoints[key]) {
        this.activeBreakpoints.push(
          this.breakpointService.getBreakpointName(key)
        );
      }
    });

    return this.activeBreakpoints;
  }

  isBreakpointActive(breakpointName: string): boolean {
    return this.activeBreakpoints.includes(breakpointName);
  }
}
