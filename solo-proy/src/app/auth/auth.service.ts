import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   user = new BehaviorSubject<User>(null);
   private tokenExpirationDuration: any;

   private signupUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC17rTFTxr_WkVAIks5AQNZpWQWHSPF9ZE';

   private loginUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC17rTFTxr_WkVAIks5AQNZpWQWHSPF9ZE';

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
      // "resData.expiresIn" string con el number of second untill the token expires
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

      const user = new User(email, userId, token, expirationDate);

      this.user.next(user);

      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
   }

   private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unexpected error occured.';

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
