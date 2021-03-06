import { Vector } from './vector';

export class Mover {

    public mass: number;
    
    public position: Vector;
    public velocity: Vector;
    public acceleration: Vector;

    public param: any;

    constructor(
                mass: number,
                x: number, y: number,
                ) {
        
        this.mass = mass;

        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
    }

    public stopMotion(){
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
    }

    public setPosition(x: number, y: number): Mover {
        this.position = new Vector(x, y);
        return this;
    }

    public setVelocity(vx: number, vy: number): Mover {
        this.velocity = new Vector(vx, vy);
        return this;
    }

    public applyForce(force: Vector): void {
        const f = Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    public update(): void {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    public calculateAttraction(m: Mover, intensity: number): Vector {
        const force = Vector.sub(this.position, m.position);
        let distance = force.mag();
        // Limiting the distance to eliminate "extreme" results for very close or very far objects
        distance = this.constrain(distance, 5.0, 30.0);
        force.normalize();
        const strength = (intensity * this.mass * m.mass) / (distance * distance);
        force.mult(strength);
        return force;
    }

    private constrain(aNumber: number, aMin: number, aMax: number): number {
        return aNumber > aMax ? aMax : aNumber < aMin ? aMin : aNumber;
    }

    public calculateStrangeAttraction(m: Mover, intensity: number): Vector {
        const force = Vector.sub(this.position, m.position);
        let distance = force.mag();
        // Limiting the distance to eliminate "extreme" results for very close or very far objects
        distance = this.constrain(distance, 5.0, 300.0);
        force.normalize();

        let strength = (intensity * this.mass * m.mass) / (distance * distance);
        // var r = 1.4;
        // var strength = (G * this.mass * m.mass) * (( r*r / ((distance+r) * (distance+r))) - (1 /(distance * distance)));
        /*
        var normale = new PVector(- force.y, force.x);
        var sens = this.mass < m.mass ? 1 : -1;
        normale.mult(sens);
        normale.mult(strength);
        */

        if (distance < 50) {
            strength *= -1;
        }

        force.mult(strength);

        // force.add(normale);
        return force;
    }

    public calculateFriction(c: number): Vector {
        //const c = 0.01;
        const normal = 1;
        const frictionMag = c * normal;

        const friction = this.velocity.clone();
        friction.mult(-1);
        friction.normalize();
        friction.mult(frictionMag);
        return friction;
    }

    public calculateDrag(c: number): Vector {
       // var c = 0.1;
        const speed = this.velocity.mag();

        const dragMagnitude = c * speed * speed;

        const dragForce = this.velocity.clone();
        dragForce.mult(-1);
        dragForce.normalize();
        dragForce.mult(dragMagnitude);
        return dragForce;
    }

    public colide(m: Mover): void {
        this.velocity.mult(this.mass); // velocity vector now hold momentum
        m.velocity.mult(m.mass); // velocity vector now hold momentum
        this.velocity.add(m.velocity); // add momentums
        this.mass += m.mass; // add mass
        this.velocity.mult(1 / this.mass); // velocity vector now velocity
    }

}
