export class Vector {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    public static sub(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    public static mult(v: Vector, n: number): Vector {
        return new Vector(v.x * n, v.y * n);
    }

    public static div(v: Vector, n: number): Vector {
        return new Vector(v.x / n, v.y / n);
    }

    public static rotate2D(v: Vector, theta: number): void {
        const xTemp = v.x;
        v.x = v.x * Math.cos(theta) - v.y * Math.sin(theta);
        v.y = xTemp * Math.sin(theta) + v.y * Math.cos(theta);
    }

    public mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public clone(): Vector {
       return new Vector(this.x, this.y);
    }

    public normalize(): void {
        const mag = this.mag();
        if( mag == 0) return;
        this.x /= mag;
        this.y /= mag;
    }

    public add(v: Vector): void {
        this.x += v.x;
        this.y += v.y;
    }

    public mult(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    public div(n: number): void {
        this.x /= n;
        this.y /= n;
    }
}
