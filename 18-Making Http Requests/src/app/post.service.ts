import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from './post.model';

// providedIn: 'root' } para NO ponerlo en providers de app.module
@Injectable({ providedIn: 'root' })
export class PostService {
   error = new Subject<string>();

   private url =
      'https://ng-complete-guide-77886-default-rtdb.firebaseio.com/posts.json';

   constructor(private http: HttpClient) {}

   createAndStorePost(title: string, content: string) {
      const postData: Post = { title, content };

      // Angular agarra el postData y lo pasa a json antes de mandarlo
      this.http
         .post<{ name: string }>(this.url, postData, {
            // observe: 'response' para q me entregue toda la response y no el resumen. ( incluye headers, status , url , etc )
            observe: 'response',
         })
         .subscribe(
            (responseData) => {
               console.log(responseData);
               // {name: '-ND5ZApr3ukM13YcMVSl'}
            },
            (error) => {
               // OCUPO SUBJECT PARA PASAR EL ERROR XQ HAGO LA SUSCRIPCION ACA Y NO EN EL COMPONENTE
               this.error.next(error.message);
            }
         );
   }

   fetchPosts() {
      // retorno el observable y me suscribo en el component
      // lo q devuelve {-ND5ZApr3ukM13YcMVSl: {content:…, title: ...}}
      return this.http
         .get<{ [key: string]: Post }>(this.url, {
            headers: new HttpHeaders({ 'Custom-Header': 'Holi Hola' }),
            params: new HttpParams().set('print', 'pretty'),
         })
         .pipe(
            map((responseData) => {
               const postArray: Post[] = [];

               // for-in va pasando las keys
               for (const key in responseData) {
                  postArray.push({ ...responseData[key], id: key });
               }

               return postArray;
            }),
            // para agarrar el error de esta otra forma
            catchError((errorRes) => {
               // mas logica o mandar mensajes a otros servers ...
               return throwError(errorRes);
            })
         );
      /* .subscribe((posts) => {
            // si hubieran varios componentes interesados en la respuesta => devolveria la data con un subject y mandandola con next, y alla suscribiendome, pero como es uno solo => na mas retorno la respuesta
         }); */
   }

   clearPosts() {
      return this.http.delete(this.url);
   }
}
