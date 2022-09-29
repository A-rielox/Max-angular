import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
   declarations: [AppComponent],
   imports: [BrowserModule, FormsModule, HttpClientModule],
   providers: [
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptorService,
         multi: true,
      },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: LoggingInterceptorService,
         multi: true,
      },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}

/*  PARA PODER OCUPAR EL INTERCEPTOR, SE EJECUTAN EN EL ORDEN Q LOS PONGO ACA

{
   provide: HTTP_INTERCEPTORS,
   useClass: AuthInterceptorService,
   multi: true,
}
*/

// para ocupar [(ngModel)] en los .html tengo q importar import { FormsModule } from '@angular/forms' en app.module y ponerlo en el imports
