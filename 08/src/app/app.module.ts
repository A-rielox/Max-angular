import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      UsersComponent,
      ServersComponent,
      UserComponent,
      EditServerComponent,
      ServerComponent,
   ],
   imports: [BrowserModule, FormsModule],
   providers: [ServersService],
   bootstrap: [AppComponent],
})
export class AppModule {}

// para ocupar [(ngModel)] en los .html tengo q importar import { FormsModule } from '@angular/forms' en app.module y ponerlo en el imports
