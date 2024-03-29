import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
   isLoginMode = true;
   isLoading = false;
   error: string = null;

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {}

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
               console.log(resData);
               this.isLoading = false;
               this.router.navigate(['/recipes']);
            },
            (errorMessage) => {
               this.error = errorMessage;
               this.isLoading = false;
            }
         );
      } else {
         this.authService.signup(email, password).subscribe({
            next: (resData) => {
               console.log(resData);
               this.isLoading = false;
               this.router.navigate(['/recipes']);
            },
            error: (errorMessage) => {
               this.error = errorMessage;
               this.isLoading = false;
            },
         });
      }

      form.reset();
   }

   onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
   }
}
