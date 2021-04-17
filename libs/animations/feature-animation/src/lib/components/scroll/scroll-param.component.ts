import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import {
  D_SCENE_PARAM_COMPONENT,
  SceneParam,
} from '../../services/param.directive';
import { SceneControlService } from '../../services/scene-control.service';
import {
  confBackgroundModes,
  confColorModes,
  confDrawings,
} from '../../services/scene-model';

import { ScrollUserParam } from './scroll-param';

@Component({
  selector: 'jz-scroll-param',
  templateUrl: './scroll-param.component.html',
  styleUrls: ['../../services/param.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: D_SCENE_PARAM_COMPONENT, useExisting: ScrollParamComponent },
  ],
})
export class ScrollParamComponent implements SceneParam, OnInit {
  @Input() userParam!: ScrollUserParam;
  @Input() controlService!: SceneControlService;

  readonly colorModes = confColorModes;
  readonly drawings = confDrawings;
  readonly bgModes = confBackgroundModes;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.controlService.display(true, false, true);
  }

  onRefresh(): void {
    this.changeDetectorRef.markForCheck();
  }

  onRandom(): void {
    const p = this.userParam;
    p.imgBack = this.random(-1, 23, 1);
    p.backHorizSpeed = this.random(-3, 3, 0.2);
    p.backVertSpeed = this.random(-3, 3, 0.2);
    p.imgFront = this.random(-1, 23, 1);
    p.frontHorizSpeed = this.random(-3, 3, 0.2);
    p.frontVertSpeed = this.random(-3, 3, 0.2);
  }

  private random(min: number, max: number, step: number): number {
    return min + Math.round(Math.random() * ((max - min) / step)) * step;
  }
}
