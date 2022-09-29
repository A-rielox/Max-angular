import {
   HttpHandler,
   HttpInterceptor,
   HttpRequest,
} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler) {
      const modifiedRequest = req.clone({
         headers: req.headers.append('Auth', 'XDXDXD'),
      });

      return next.handle(modifiedRequest);
   }
}
/*  .pipe PARA MODIFICAR LA RESPUESTA QUE LLEGA ( PUEDO NO PONERLA )

*/

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
