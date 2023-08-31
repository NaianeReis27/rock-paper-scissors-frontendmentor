import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './components/game/game.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    ScoreboardComponent,
    HomeComponent,
    GameComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

  ]
})
export class HomeModule { }
