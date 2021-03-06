import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  public audio: HTMLAudioElement;
  private location = 'assets/sounds/';
 
  constructor() {
    this.audio = new Audio();
   }

  public setAudio(src: string): void {
    this.audio.src = src;
    console.log(`Load ${src}`);
    // this.playAudio();
  }

  public playAudio(): void {
    console.log(`Play ${this.audio.src}`);
    this.audio.play();
  }

  public playCardShuffle(): void {
    const soundName = 'CardShuffle';
    this.setAudio(`${this.location}${soundName}.mp3`);
    this.playAudio();
  }

  public playCardFlip(): void {
    const n = Math.floor(Math.random() * 3) + 1;
    const soundName = 'CardFlip';
    this.setAudio(`${this.location}${soundName}${n}.mp3`);
    this.playAudio();
  }

  public playCardFound(): void {
    const soundName = 'CardFound';
    this.setAudio(`${this.location}${soundName}.mp3`);
    this.playAudio();
  }

  public playCardPlace(count: number): void {

    /*
    const soundName = 'CardPlace';
    this.setAudio(`${this.location}${soundName}.mp3`);

    var fnSoundRepeat = function(){
      this.currentTime = 0;
      if (--count>0)
        this.play();
      else
      this.removeEventListener('ended', fnSoundRepeat);
    }

  this.audio.addEventListener('ended', fnSoundRepeat)
  this.audio.play();
  */
  /*
    this.audio.addEventListener('ended', function() {
      this.currentTime = 0;
      if (--count>0)
        this.play();
      }, false);
    this.audio.play();
*/
  }

  public playCardWinning(): void {
    const soundName = 'CardWinning';
    this.setAudio(`${this.location}${soundName}.mp3`);
    this.playAudio();
  }
}
