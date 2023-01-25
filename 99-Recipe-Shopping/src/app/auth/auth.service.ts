import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

interface AuthResponseData {
   kind: string;
   idToken: string;
   email: string;
   refreshToken: string;
   expiresIn: string;
   localId: string;
   registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
   // BehaviorSubject para poder acceder al valor en cualquier momento y NO solo cuando se emite el evento
   // en este caso el valor se obtiene cuando se hace el login, pero lo voy a ocupara tb despues cuando haga el request de las recetas ( en cualquier momento despues )
   user = new BehaviorSubject<User>(null);
   private tokenExpirationDuration: any;

   private signupUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBw2P-2oRB9UnPoslNuqOJuBbUsctoX5mg';

   private loginUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBw2P-2oRB9UnPoslNuqOJuBbUsctoX5mg';

   constructor(private http: HttpClient, private router: Router) {}

   signup(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(this.signupUrl, {
            email: email,
            password: password,
            returnSecureToken: true,
         })
         .pipe(
            catchError(this.handleError),
            tap((resData) => {
               this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
               );
            })
         );
   }

   login(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(this.loginUrl, {
            email: email,
            password: password,
            returnSecureToken: true,
         })
         .pipe(
            catchError(this.handleError),
            tap((resData) => {
               this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
               );
            })
         );
   }

   autoLogin() {
      const userData: {
         email: string;
         id: string;
         _token: string;
         _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
         return;
      }

      const loadedUser = new User(
         userData.email,
         userData.id,
         userData._token,
         new Date(userData._tokenExpirationDate)
      );

      // este token ya es del getter, xq ahora estoy ocupando el modelo, asi q entra aca solo si tiene token y aun es valido
      if (loadedUser.token) {
         this.user.next(loadedUser);

         const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();

         this.autoLogout(expirationDuration);
      }
   }

   logout() {
      this.user.next(null);

      // hago el auto logout aqui xq hay varios lugares donde se va a hacer el logout, con el login es solo desde la form xeso es distinto
      this.router.navigate(['/auth']);

      localStorage.removeItem('userData');

      if (this.tokenExpirationDuration) {
         clearTimeout(this.tokenExpirationDuration);
      }
      this.tokenExpirationDuration = null;
   }

   autoLogout(expirationDuration: number) {
      this.tokenExpirationDuration = setTimeout(() => {
         this.logout();
      }, expirationDuration);
   }

   private handleAuthentication(
      email: string,
      userId: string,
      token: string,
      expiresIn: number
   ) {
      // "expiresIn" string con el number of second untill the token expires
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

      const user = new User(email, userId, token, expirationDate);

      this.user.next(user);
      this.autoLogout(expiresIn * 1000);

      localStorage.setItem('userData', JSON.stringify(user));
   }

   private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unexpected error occured.';
      console.log(errorRes);

      if (!errorRes.error || !errorRes.error.error) {
         return throwError(errorMessage);
      }

      switch (errorRes.error.error.message) {
         case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
            break;
         case 'INVALID_PASSWORD':
            errorMessage = 'Invalid Password';
            break;
         case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email is not registered';
            break;
      }

      return throwError(errorMessage);
   }
}

/*  
api key
AIzaSyBw2P-2oRB9UnPoslNuqOJuBbUsctoX5mg

endpoint signUp
https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

*/
/*  OLD FIREBASE RULES

{
   "rules": {
       ".read": "now < 1667019600000",  // 2022-10-29
       ".write": "now < 1667019600000",  // 2022-10-29
   }
}

*/
