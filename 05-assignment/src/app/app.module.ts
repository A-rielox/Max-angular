import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameControlComponent } from './game-control/game-control.component';
import { OddComponent } from './odd/odd.component';
import { EvenComponent } from './even/even.component';

@NgModule({
   declarations: [AppComponent, GameControlComponent, OddComponent, EvenComponent],
   imports: [BrowserModule, FormsModule],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}

// para ocupar [(ngModel)] en los .html tengo q importar import { FormsModule } from '@angular/forms' en app.module y ponerlo en el imports
