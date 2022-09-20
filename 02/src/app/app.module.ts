import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//
import { FormsModule } from '@angular/forms';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';

@NgModule({
   declarations: [AppComponent, ServerComponent, ServersComponent],
   imports: [BrowserModule, FormsModule],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
   
// para ocupar [(ngModel)] en los .html tengo q importar import { FormsModule } from '@angular/forms' en app.module y ponerlo en el imports
// [(ngModel)]="data" es para two-way binding , info entre el component y el .html
// para pasar info desde .html hacia componente es con event binding (event)="expression"
// para pasar info hacia el template (.html) es con string interpolation {{ data }} o property binding [property]="data" ( la variable data estaria en el componente )

// para poder ocupar un componente lo importo y lo pongo en declarations:[...], si los creo con cli, se hace solo
