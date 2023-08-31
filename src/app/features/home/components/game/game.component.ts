import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ICircle } from './interfaces/interfaces';
import { GroupComponentsGame, Game } from 'src/app/models/game.models';
import { ModalService } from 'src/app/shared/core/services/modal.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('canvasElement', { static: true }) canvasElement!: ElementRef;
  game: Game | undefined;
  canvas!: HTMLCanvasElement;
  status!: string | undefined;
  circles: ICircle[] = [];
  context!: CanvasRenderingContext2D;
  groupComponentsGame!: GroupComponentsGame;

  constructor( public modalService: ModalService){

  }

  ngOnInit() {
    this.canvas = this.canvasElement.nativeElement;
    this.context = this.canvas.getContext('2d')!;
    this.canvas.width = 1366;
    this.canvas.height = 700;

    if (this.context) {
      this.game = new Game(this.canvas, this.context);
      this.game.startGame();
      this.animate(this.game, this.context, this.canvas);
    }
  }
  changeStage() {
    this.game!.stage = 1;
  }

  animate(
    game: Game,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.status = this.game?.status;

    game.update();

    requestAnimationFrame(() => this.animate(game, context, canvas));
  }

  eventCanvas($event: any) {
    this.game?.clickGame($event);
  }
}
