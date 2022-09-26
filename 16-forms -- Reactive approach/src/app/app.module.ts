import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms'; NO lo necesito en el reactive approach, ahora necesito el ReactiveFormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
   declarations: [AppComponent],
   imports: [BrowserModule, ReactiveFormsModule],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}

// para ocupar [(ngModel)] en los .html tengo q importar import { FormsModule } from '@angular/forms' en app.module y ponerlo en el imports
