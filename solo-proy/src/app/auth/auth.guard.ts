import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   CanActivate,
   Router,
   RouterStateSnapshot,
   UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      return this.authService.user.pipe(
         take(1),
         map((user) => {
            const isAuth = !!user;
            if (isAuth) {
               return true;
            }

            // si no estoy autenticado => me redirige a /auth
            return this.router.createUrlTree(['/auth']);
         })
      );
   }
}

// funciona xq el logout() o en autoLogout() se hace "this.user.next(null)" y aca daria false
