import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;

  constructor() {}

  init(audioElement: HTMLAudioElement): void {
    this.audio = audioElement;
  }

  toggleMusic(): { isPlaying: boolean; status: string } {
    if (!this.audio) {
      return { isPlaying: false, status: 'play' };
    }

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      return { isPlaying: false, status: 'play' };
    } else {
      this.audio.play();
      this.isPlaying = true;
      return { isPlaying: true, status: 'pause' };
    }
  }

  getStatus(): string {
    return this.isPlaying ? 'pause' : 'play';
  }
}
