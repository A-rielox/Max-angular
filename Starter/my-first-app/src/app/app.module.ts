import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
   declarations: [AppComponent],
   imports: [BrowserModule],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}

// para ocupar [(ngModel)] en los .html tengo q importar import { FormsModule } from '@angular/forms' en app.module y ponerlo en el imports
