import { Mover } from '@hobbies/shared/util-kinetic';

export interface Xyr {
    x: number;
    y: number;
    r: number;
    m: Mover;
  }
  
  export interface MoverLink {
    m: Mover;
    d: number;
  }
  
  export interface MoverParam {
    radius: number;
    age: number;
    links: MoverLink[];
  }