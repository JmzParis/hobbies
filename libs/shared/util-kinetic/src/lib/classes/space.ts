import { Mover } from './mover';

export enum SpaceType {
  Torus = 1,
  Box,
  Infinite,
}

export interface Boundary {
  min_x: number;
  max_x: number;
  min_y: number;
  max_y: number;
}

const defaultBoundary = {
  min_x: 0,
  max_x: 0,
  min_y: 0,
  max_y: 0,
} as Boundary;

export class Space {
  public boundary = defaultBoundary;

  constructor(
    private spaceType: SpaceType = SpaceType.Box,
    private spaceHedgeAmortized: boolean = false
  ) {}

  public init(width: number, height: number, border: number): void {
    this.boundary = {
      min_x: border,
      max_x: width - 2 * border,
      min_y: border,
      max_y: height - 2 * border,
    } as Boundary;
    //const b = this.boundary;
    //console.log(`after init boundary: ${b.min_x}x${b.min_y} - ${b.max_x}x${b.max_y} ie: ${width}x${height} border: ${border}`);
  }

  public checkEdges(m: Mover): boolean {
    if (!this.boundary) return false;
    let colide = false;
    const pos = m.position;
    const velocity = m.velocity;
    const b = this.boundary;
    switch (this.spaceType) {
      case SpaceType.Box:
        if (pos.x > b.max_x) {
          pos.x = b.max_x;
          velocity.x *= -1;
          colide = true;
        } else if (pos.x < b.min_x) {
          pos.x = b.min_x;
          velocity.x *= -1;
          colide = true;
        }
        if (pos.y > b.max_y) {
          pos.y = b.max_y;
          velocity.y *= -1;
          colide = true;
        } else if (pos.y < b.min_y) {
          pos.y = b.min_y;
          velocity.y *= -1;
          colide = true;
        }

        if (colide && this.spaceHedgeAmortized && velocity.mag() > 5) {
          velocity.mult(0.3);
        }
        break;

      case SpaceType.Torus:
        if (pos.x > b.max_x) {
          pos.x %= b.max_x;
          colide = true;
        } else if (pos.x < b.min_x) {
          pos.x %= b.max_x;
          pos.x += b.max_x;
          colide = true;
        }
        if (pos.y > b.max_y) {
          pos.y %= b.max_y;
          colide = true;
        } else if (pos.y < b.min_y) {
          pos.y %= b.max_y;
          pos.y += b.max_y;
          colide = true;
        }
        break;

      default:
        colide = false;
        break;
    }
    return colide;
  }
}
