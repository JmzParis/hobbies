import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Config } from '../model/config';
import { BoardService } from '../services/board.service';
import { CustomBreakpointNames } from '../services/breakpoints.service';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'jz-board-layout',
  templateUrl: './board-layout.component.html',
  styleUrls: ['./board-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardLayoutComponent {
  displayConfig = true;
  gameConf$ = this.board.gameConf$;

  componentSize?: string;
  boardSize!: string;
  boardStyle!: string;
  scoreboardSize?: string;
  scoreboardStyle = '';
  playersStyle = '';
  orientation!: string;
  isLandscape = false;
  @ViewChild('layout') layout!: ElementRef;

  constructor(
    private layoutService: LayoutService,
    private readonly board: BoardService
  ) {}

  onConfigClosed(config: Config): void {
    this.displayConfig = false;
    this.board.init(config);
  }

  ngOnInit(): void {
    this.layoutService
      .subscribeToLayoutChanges()
      .subscribe((observerResponse) => {
        this.isLandscape = this.layoutService.isBreakpointActive(
          CustomBreakpointNames.landscape
        );
        this.orientation = this.isLandscape ? 'Landscape' : 'Portrait';
        this.fitToAvailableSize();
      });
  }

  ngAfterViewInit() {
    this.fitToAvailableSize();
  }

  private fitToAvailableSize() {
    const boardSize = this.calcBoardSize();
    if (boardSize) {
      this.componentSize = this.getComponentSize();
      this.boardStyle = `width: ${boardSize}px; height:${boardSize}px;`;
      this.boardSize = `${boardSize} x ${boardSize}`;
      this.scoreboardSize = this.getScoreboardSize();
    }
  }

  private calcBoardSize(): number | undefined {
    if (!this.layout) return undefined;
    const layoutEle = this.layout.nativeElement;
    return layoutEle.clientWidth > layoutEle.clientHeight
      ? layoutEle.clientHeight
      : layoutEle.clientWidth;
  }

  private getComponentSize(): string | undefined {
    if (!this.layout) return undefined;
    const layoutEle = this.layout.nativeElement;
    return `${layoutEle.clientWidth} x ${layoutEle.clientHeight}`;
  }

  private getScoreboardSize(): string | undefined {
    if (!this.layout) return undefined;
    const layoutEle = this.layout.nativeElement;
    return this.isLandscape
      ? `${layoutEle.clientWidth - layoutEle.clientHeight} x ${
          layoutEle.clientHeight
        }`
      : `${layoutEle.clientWidth} x ${
          layoutEle.clientHeight - layoutEle.clientWidth
        }`;
  }
}
