import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   CanActivate,
   CanActivateChild,
   Router,
   RouterStateSnapshot,
   UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
   constructor(private authService: AuthService, private router: Router) {}

   // los parametros los entrega Angular
   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService
         .isAuthenticated()
         .then((authenticated: boolean) => {
            if (authenticated) {
               return true;
            } else {
               this.router.navigate(['/']);
            }
         });
   }

   canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
   }
}

// las guards las tengo q dar de alta en providers de app.module
   