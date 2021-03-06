import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  public normalDistribution(min: number, max: number, skew: number): number {
    let u = 0;
    let v = 0;
    while (u === 0) { u = Math.random(); } // Converting [0,1) to (0,1)
    while (v === 0) { v = Math.random(); }
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) { num = this.normalDistribution(min, max, skew); } // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

public gaussianRand() {
    let rand = 0;

    for (let i = 0; i < 6; i += 1) {
      rand += Math.random();
    }

    return rand / 6;
  }

  public gaussianRandom(start: number, end: number) {
    return Math.floor(start + this.gaussianRand() * (end - start + 1));
  }
}
