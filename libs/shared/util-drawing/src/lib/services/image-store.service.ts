import { Injectable } from '@angular/core';

export interface ImageBlock {
  images: HTMLImageElement[];
  imgLoaded: boolean;
}

const defaultImageBlock = {
  images: [] as HTMLImageElement[],
  imgLoaded: false,
} as ImageBlock;

@Injectable({
  providedIn: 'root',
})
export class ImageStoreService {
  blocs: { [Key: string]: ImageBlock } = {};

  public load(keyName: string, pictureNames: string[]): ImageBlock {
    const newBloc = { ...defaultImageBlock } as ImageBlock;
    const imageArray = new Array<HTMLImageElement>(pictureNames.length);
    newBloc.images = imageArray;

    let i = 0;
    for (const picName of pictureNames) {
      // console.log(`Start loading ${keyName}: ${picName}`);
      imageArray[i++] = this.loadImage(picName);
    }
    this.blocs[keyName] = newBloc;
    return newBloc;
  }

  private loadImage(src: string): HTMLImageElement {
    const img = new Image();
    img.src = src;
    //img.onload = () => this.onImageLoaded(img);
    return img;
  }
  //private onImageLoaded(img: HTMLImageElement): void {}

  public areAllImageLoaded(keyName: string): boolean {
    // console.log(`ImageBlocs["${name}"].test()`);
    const imageBlock = this.blocs[keyName];
    if (imageBlock.imgLoaded) return true;
    for (const image of imageBlock.images) {
      if (!image.complete) {
        // console.log(`ImageBlocs["${keyName}"].image[${image.src}] still not complete`);
        return false;
      }
    }
    imageBlock.imgLoaded = true;
    //console.log(`ImageBlocs["${keyName}"] is now completed ${imageBlock.images.length}`);
    return true;
  }

  public getImages(name: string) {
    return this.blocs[name].images;
  }

  public getImage(name: string, index: number): HTMLImageElement {
    return this.blocs[name].images[index];
  }
}
