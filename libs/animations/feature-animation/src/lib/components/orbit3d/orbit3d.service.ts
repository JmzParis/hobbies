import { Injectable } from '@angular/core';
import { Mover3d } from '@hobbies/shared/util-kinetic';
import { Animation3dParam, UserParam } from '../../services/scene-model';
import { Orbit3dUserParam } from './orbit3d-param';
import {
  Vector3,
  SphereGeometry,
  MeshBasicMaterial,
  Object3D,
  Mesh,
  AmbientLight,
  MeshPhongMaterial,
  DoubleSide,
  Color,
  Group,
  PointLight,
  PerspectiveCamera,
  TextureLoader,
  DirectionalLight,
  Texture,
  Scene,
} from 'three';
import { Scene3dBaseService } from '../../services/three-shared';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';

@Injectable({
  providedIn: 'root',
})
export class Orbit3dService extends Scene3dBaseService {
  private movers: Mover3d[] = [];

  protected customizeScene(scene: Scene): Scene {
    scene.add(new AmbientLight(0x303030));
    return scene;
  }

  protected customizeCamera(camera: PerspectiveCamera): PerspectiveCamera {
    //camera.position.set( 0, 150, 500 );
    camera.position.z = 12;
    return camera;
  }

  protected buildSubject(up: UserParam): Object3D[] {
    const orbit3dUserParam = up as Orbit3dUserParam;
    const system = this.buildSystem(orbit3dUserParam);
    this.positionStableSystem(orbit3dUserParam);
    return system;
  }

  private buildSystem(orbitUserParam: Orbit3dUserParam): Object3D[] {
    const objects = [] as Object3D[];

    this.movers = [];

    // lensflares
    const textureLoader = new TextureLoader();

    const textureFlare0 = textureLoader.load(
      'assets/img/lensflare/lensflare0.png'
    );
    const textureFlare3 = textureLoader.load(
      'assets/img/lensflare/lensflare3.png'
    );

    for (let i = 0; i < orbitUserParam.corpsCount; i++) {
      const isSun = i < orbitUserParam.sunCount;

      const mass = isSun
        ? orbitUserParam.sunMass
        : Math.random() * orbitUserParam.maxMass;
      const mover = new Mover3d(mass, 0, 0, 0);
      const corps = isSun
        ? this.buildSun(textureFlare0, textureFlare3)
        : this.buildPlanet();
      corps.position.copy(mover.position);
      mover.param = corps;
      this.movers[i] = mover;
      objects.push(corps);
    }
    /*
    // A déplacer sur les sun...
    const light = new PointLight(0xffffff, 1.5);
    light.position.set(0, 0, 0);
    objects.push(light);
*/
    return objects;
  }

  private buildPlanet(): Object3D {
    const geometry = new SphereGeometry(0.5, 10, 10);
    const color = new Color(0xffffff);
    color.setHSL(Math.random(), 1, Math.random());
    const material = new MeshPhongMaterial({ color: color });
    const sphere = new Mesh(geometry, material);
    return sphere;
  }

  private buildSun(textureFlare0: Texture, textureFlare3: Texture): Object3D {
    const light = new PointLight(0xffffff, 1.5, 2000);
    light.color.setHSL(Math.random(), 1, 0.5);

    const lensflare = new Lensflare();
    lensflare.addElement(
      new LensflareElement(textureFlare0, 700, 0, light.color)
    );
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
    light.add(lensflare);
    return light;
  }

  public positionStableSystem(orbitUserParam: Orbit3dUserParam): void {
    const movers = this.movers;
    let momentum: Vector3;
    const epsilon = 0.5;
    let iter = 0;
    const zAxis = new Vector3(0, 0, 1);
    momentum = new Vector3();
    let m = 0;
    for (const mover of movers) {
      const r =
        orbitUserParam.radiusMin +
        Math.random() * (orbitUserParam.radiusMax - orbitUserParam.radiusMin);
      const theta = 2 * Math.PI * Math.random();
      const x = r * Math.sin(theta);
      const y = r * Math.cos(theta);
      const z = (0.5 - Math.random()) * orbitUserParam.zSpread;
      if (m === 0) {
        mover.setPosition(0, 0, z);
        mover.setVelocity(0, 0, 0);
      } else {
        mover.setPosition(x, y, z);
        const v = Math.sqrt(mover.position.length() / 100);
        mover.velocity
          .crossVectors(mover.position, zAxis)
          .normalize()
          .multiplyScalar(v);
      }
      console.log(
        `M${m}: P=${this.v2s(mover.position)}, S=${this.v2s(mover.velocity)}`
      );
      momentum.add(mover.velocity.clone().multiplyScalar(mover.mass));
      m = m + 1;
    }
    console.log(`Centered: ${iter} ${this.v2s(momentum)}`);
  }

  public v2s(v: Vector3): string {
    return `(${Math.round(v.x)}, ${Math.round(v.y)}, ${Math.round(
      v.z
    )}).l=${Math.round(v.length())}`;
  }

  public draw(delay: number, fullParam: Animation3dParam): void {
    super.draw(delay, fullParam);

    const orbitUserParam = fullParam.userParam as Orbit3dUserParam;

    const g = orbitUserParam.gravity;
    const movers = this.movers;

    const moverCount = movers.length;
    for (let i = 0; i < moverCount; i++) {
      const mover = movers[i];
      for (let j = 0; j < moverCount; j++) {
        if (i !== j) {
          mover.applyForce(movers[j].calculateAttraction(mover, g));
        }
      }

      // mover.applyForce(wind);
      // mover.applyForce(mover.computeGravity());
      // mover.applyForce(mover.calculateFriction());
      // console.log(
      //   `m${i}: P=${this.v2s(mover.position)}, V=${this.v2s(
      //     mover.velocity
      //   )}, A=${this.v2s(mover.acceleration)}`
      // );

      mover.update();
      // console.log(
      //   `M${i}: P=${this.v2s(mover.position)}, V=${this.v2s(
      //     mover.velocity
      //   )}, A=${this.v2s(mover.acceleration)}`
      // );

      (mover.param as Mesh).position.copy(mover.position);
      //this.space.checkEdges(mover);
    }
  }
}
