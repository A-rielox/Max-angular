import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
   isLoginMode = true;
   isLoading = false;
   error: string = null;

   constructor(private authService: AuthService, private router: Router) {}

   onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
   }

   onSubmit(form: NgForm) {
      if (form.invalid) {
         return;
      }

      const email = form.value.email;
      const password = form.value.password;

      this.isLoading = true;

      if (this.isLoginMode) {
         this.authService.login(email, password).subscribe(
            (resData) => {
               this.isLoading = false;
               this.router.navigate(['/recipes']);
            },
            (errorMessage) => {
               // este es el q viene d mi " return throwError(errorMessage); " de auth.service
               this.error = errorMessage;
               this.isLoading = false;
            }
         );
      } else {
         this.authService.signup(email, password).subscribe(
            (resData) => {
               this.isLoading = false;
               this.router.navigate(['/recipes']);
            },
            (errorMessage) => {
               // este es el q viene d mi " return throwError(errorMessage); " de auth.service
               this.error = errorMessage;
               this.isLoading = false;
            }
         );
      }

      form.reset();
   }

   onHandleError() {
      this.error = null;
   }
}
