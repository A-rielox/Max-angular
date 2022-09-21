import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActiveUsersComponent } from './active-users/active-users.component';

import { AppComponent } from './app.component';
import { CounterService } from './counter.service';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { UsersService } from './users.service';

@NgModule({
   declarations: [AppComponent, ActiveUsersComponent, InactiveUsersComponent],
   imports: [BrowserModule, FormsModule],
   providers: [UsersService, CounterService],
   bootstrap: [AppComponent],
})
export class AppModule {}

// para ocupar [(ngModel)] en los .html tengo q importar import { FormsModule } from '@angular/forms' en app.module y ponerlo en el imports
