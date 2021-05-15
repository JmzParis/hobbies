import { Vector3 } from 'three';

export class Mover3d {
  public mass: number;

  public position: Vector3;
  public velocity: Vector3;
  public acceleration: Vector3;

  public param: any;

  constructor(mass: number, x: number, y: number, z: number) {
    this.mass = mass;

    this.position = new Vector3(x, y, z);
    this.velocity = new Vector3(0, 0, 0);
    this.acceleration = new Vector3(0, 0, 0);
  }

  public stopMotion() {
    this.velocity = new Vector3(0, 0, 0);
    this.acceleration = new Vector3(0, 0, 0);
  }

  public setPosition(x: number, y: number, z: number): Mover3d {
    this.position = new Vector3(x, y, z);
    return this;
  }

  public setVelocity(vx: number, vy: number, vz: number): Mover3d {
    this.velocity = new Vector3(vx, vy, vz);
    return this;
  }

  public applyForce(force: Vector3): void {
    const f = force.clone().divideScalar(this.mass);
    this.acceleration.add(f);
  }

  public update(): void {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.multiplyScalar(0);
  }

  public calculateAttraction(m: Mover3d, intensity: number): Vector3 {
    const force = new Vector3().subVectors(this.position, m.position);
    let distance = force.length();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = this.constrain(distance, 5.0, 30.0);
    force.normalize();
    const strength = (intensity * this.mass * m.mass) / (distance * distance);
    force.multiplyScalar(strength);
    return force;
  }

  private constrain(aNumber: number, aMin: number, aMax: number): number {
    return aNumber > aMax ? aMax : aNumber < aMin ? aMin : aNumber;
  }

  public calculateStrangeAttraction(m: Mover3d, intensity: number): Vector3 {
    const force = new Vector3().subVectors(this.position, m.position);
    let distance = force.length();
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = this.constrain(distance, 5.0, 300.0);
    force.normalize();

    let strength = (intensity * this.mass * m.mass) / (distance * distance);
    // var r = 1.4;
    // var strength = (G * this.mass * m.mass) * (( r*r / ((distance+r) * (distance+r))) - (1 /(distance * distance)));
    /*
        var normale = new PVector(- force.y, force.x);
        var sens = this.mass < m.mass ? 1 : -1;
        normale.multiplyScalar(sens);
        normale.multiplyScalar(strength);
        */

    if (distance < 50) {
      strength *= -1;
    }

    force.multiplyScalar(strength);

    // force.add(normale);
    return force;
  }

  public calculateFriction(c: number): Vector3 {
    //const c = 0.01;
    const normal = 1;
    const frictionMag = c * normal;

    const friction = this.velocity.clone();
    friction.multiplyScalar(-1);
    friction.normalize();
    friction.multiplyScalar(frictionMag);
    return friction;
  }

  public calculateDrag(c: number): Vector3 {
    // var c = 0.1;
    const speed = this.velocity.length();

    const dragMagnitude = c * speed * speed;

    const dragForce = this.velocity.clone();
    dragForce.multiplyScalar(-1);
    dragForce.normalize();
    dragForce.multiplyScalar(dragMagnitude);
    return dragForce;
  }

  public colide(m: Mover3d): void {
    this.velocity.multiplyScalar(this.mass); // velocity vector now hold momentum
    m.velocity.multiplyScalar(m.mass); // velocity vector now hold momentum
    this.velocity.add(m.velocity); // add momentums
    this.mass += m.mass; // add mass
    this.velocity.multiplyScalar(1 / this.mass); // velocity vector now velocity
  }
}
