import {
   ActivatedRouteSnapshot,
   CanDeactivate,
   RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
   canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard
   implements CanDeactivate<CanComponentDeactivate>
{
   // este es el metodo q se va a llamar cuando se intente dejar una ruta
   canDeactivate(
      component: CanComponentDeactivate,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
   ): Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate();
   }
}
