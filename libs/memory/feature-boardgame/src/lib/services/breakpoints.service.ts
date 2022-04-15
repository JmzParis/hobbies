import { Injectable } from '@angular/core';

export const CustomBreakpointNames = {
  extraSmall: 'extraSmall',
  extraLarge: 'extraLarge',
  portrait: 'portrait',
  landscape: 'landscape',
};

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  breakpoints: { [key: string]: string } = {
    '(max-width: 220px)': CustomBreakpointNames.extraSmall,
    '(min-width: 2400px)': CustomBreakpointNames.extraLarge,
    '(orientation: portrait)': CustomBreakpointNames.portrait,
    '(orientation: landscape)': CustomBreakpointNames.landscape,
  };

  getBreakpoints(): string[] {
    return Object.keys(this.breakpoints);
  }

  getBreakpointName(breakpointValue: string): string {
    return this.breakpoints[breakpointValue];
  }

  constructor() {}
}
