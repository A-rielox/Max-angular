import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
   declarations: [AppComponent],
   imports: [BrowserModule, FormsModule, HttpClientModule],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}

// para ocupar [(ngModel)] en los .html tengo q importar import { FormsModule } from '@angular/forms' en app.module y ponerlo en el imports
