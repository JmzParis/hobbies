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

  public load(name: string, pictureNames: string[]): ImageBlock {
    const newBloc = { ...defaultImageBlock } as ImageBlock;
    const imageArray = newBloc.images;
    for (const picName of pictureNames) {
      imageArray[imageArray.length] = this.loadImage(picName);
    }
    this.blocs[name] = newBloc;
    return newBloc;
  }

  private loadImage(src: string): HTMLImageElement {
    const img = new Image();
    img.src = src;
    //img.onload = () => this.onImageLoaded(img);
    return img;
  }
  //private onImageLoaded(img: HTMLImageElement): void {}

  public areAllImageLoaded(name: string): boolean {
    // console.log(`ImageBlocs["${name}"].test()`);
    const imageBlock = this.blocs[name];
    if (imageBlock.imgLoaded) return true;
    for (const image of imageBlock.images) {
      if (!image.complete) {
        console.log(`ImageBlocs["${name}"].image[${image.src}] still not complete`);
        return false;
      }      
    }
    imageBlock.imgLoaded = true;
    console.log(`ImageBlocs["${name}"] is now completed`);
    return true;
  }

  public getImages(name: string) {
    return this.blocs[name].images;
  }

  public getImage(name: string, index: number): HTMLImageElement {
    return this.blocs[name].images[index];
  }
}
