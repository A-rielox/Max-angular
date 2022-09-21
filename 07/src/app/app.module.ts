import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccountComponent } from './account/account.component';
import { AccountsService } from './accounts.service';

import { AppComponent } from './app.component';
import { LoggingService } from './logging.service';
import { NewAccountComponent } from './new-account/new-account.component';

@NgModule({
   declarations: [AppComponent, AccountComponent, NewAccountComponent],
   imports: [BrowserModule, FormsModule],
   providers: [AccountsService, LoggingService],
   bootstrap: [AppComponent],
})
export class AppModule {}

// providers: [AccountsService], PARA LOS SERVICE
// PONIENDO LOS SERVICE AQUI => PUEDO INJECTAR LOS SERVICIOS EN OTROS SERVICIOS

// para ocupar [(ngModel)] en los .html tengo q importar import { FormsModule } from '@angular/forms' en app.module y ponerlo en el imports
