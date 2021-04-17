import { Component, Input } from '@angular/core';
import { SceneControlService } from '../scene-control.service';

@Component({
  selector: 'jz-scene-control',
  templateUrl: './scene-control.component.html',
  styleUrls: ['./scene-control.component.scss'],
})
export class SceneControlComponent {
  @Input() controlService!: SceneControlService;

  isStopable = true;

  onRandom(): void {
    this.controlService.onRandom();
  }

  onStopOrPlay(): void {
    if (this.isStopable) {
      this.onStop();
    } else {
      this.onRestart();
    }
    this.isStopable = !this.isStopable;
  }

  onRestart(): void {
    this.controlService.onRestart();
  }

  onStop(): void {
    this.controlService.onStop();
  }
}
