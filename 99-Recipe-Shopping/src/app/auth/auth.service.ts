import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
   kind: string;
   idToken: string;
   email: string;
   refreshToken: string;
   expiresIn: string;
   localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
   private fbUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBw2P-2oRB9UnPoslNuqOJuBbUsctoX5mg';

   constructor(private http: HttpClient) {}

   signup(email: string, password: string) {
      return this.http.post<AuthResponseData>(this.fbUrl, {
         email: email,
         password: password,
         returnSecureToken: true,
      });
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
