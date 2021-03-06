import { Injectable } from '@angular/core';
import {
  allFlatIconsAnimals,
  allFlatIconsNature,
  allPictureNames,
} from './pictures';
import { SoundService } from './sound.service';

export interface PictureLocation {
  path: string;
  name: string;
  type: string;
}

interface PackLocation {
  path: string;
  names: string[];
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CardmixerService {
  nextCardNumberToDistribute = 0;
  pictures: PictureLocation[] = [];

  constructor(private sound: SoundService) {}

  private buildIconLocations(
    packs: PackLocation[],
    pairCount: number
  ): PictureLocation[] {
    let all = [] as PictureLocation[];
    for (const pack of packs) {
      all = [
        ...all,
        ...pack.names.map(
          (n) =>
            ({ path: pack.path, name: n, type: pack.type } as PictureLocation)
        ),
      ];
    }

    console.log(`Sorting ${all.length} pictureNames`);
    all.sort(() => Math.random() - 0.5); // shuffles the names so that

    all.length = pairCount; // reduce array to only pairCount names

    return [...all, ...all];
  }

  public shuffle(pairCount: number): void {
    console.log(`shuffle ${pairCount} pairCount`);
    this.sound.playCardShuffle();

    this.nextCardNumberToDistribute = 0;
    /*
    const flaticonAnimal = {
      path: 'assets/img/animals/',
      names: allPictureNames,
      type: 'png',
    } as PackLocation;
*/
    const flaticonAnimal = {
      path: 'assets/img/flaticon-1998559-animal/',
      names: allFlatIconsAnimals,
      type: 'png',
    } as PackLocation;

    const flaticonNature = {
      path: 'assets/img/flaticon-3095089-nature/',
      names: allFlatIconsNature,
      type: 'png',
    } as PackLocation;

    this.pictures = this.buildIconLocations(
      [flaticonAnimal, flaticonNature],
      pairCount
    );
    this.pictures.sort(() => Math.random() - 0.5); // shuffle the pairs
  }

  public getCard(cardId: number): PictureLocation {
    const location = this.pictures[cardId];
    // console.log(`picture[${cardId}]='${location.path}${location.name}.${location.type}'`);
    return location;
  }
}
