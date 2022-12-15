import {
   HttpEventType,
   HttpHandler,
   HttpInterceptor,
   HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler) {
      //
      return next.handle(req).pipe(
         tap((event) => {
            if (event.type === HttpEventType.Response) {
               console.log('Response arrived, body data: ');
               console.log(event.body);
            }
         })
      );
   }
}

/*  .pipe PARA MODIFICAR LA RESPUESTA QUE LLEGA ( PUEDO NO PONERLA )



en app.module PARA PODER OCUPAR EL INTERCEPTOR

providers: [
   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
   },
],
*/
