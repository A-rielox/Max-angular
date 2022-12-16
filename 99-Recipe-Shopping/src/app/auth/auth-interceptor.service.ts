import { Injectable } from '@angular/core';

import {
   HttpHandler,
   HttpInterceptor,
   HttpParams,
   HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
   constructor(private authService: AuthService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler) {
      // take(1) para q agarre un solo valor y luego haga .unsubscribe
      // con esto c/vez q corra fetchRecipes() se subscribe, agarra el valor y hace unsubscribe
      // todo este show en video 302,303
      return this.authService.user.pipe(
         take(1),
         exhaustMap((user) => {
            if (!user) {
               return next.handle(req);
               // sin esto, el user inicial ( antes del login ) es null, asi q user.token da error y NO se manda el modifiedRequest
            }

            const modifiedRequest = req.clone({
               params: new HttpParams().set('auth', user.token),
            });

            return next.handle(modifiedRequest);
         })
      );
   }
}

// exhaustMap espera a q se complete el primer observable ( el q retorna el user ), esta respuesta se va a meter el el exhaustMap como parametro y va a devolver otro observable ( como resultado del pipe )

/*  PARA DISCRIMINAR EN QUE REQUEST SE MANDE 
puero poner dentro de intercept un if con 
if(req.url === http.....)...

*/

/*  
en app.module PARA PODER OCUPAR EL INTERCEPTOR

providers: [
   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
   },
],
*/
