import {
   ActivatedRouteSnapshot,
   CanDeactivate,
   RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
   canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// el componente q se va a dejar debe implementar esta interface, para asegurarme de que tenga el metodo " .canDeactivate() "

export class CanDeactivateGuard
   implements CanDeactivate<CanComponentDeactivate>
{
   // este es el metodo q se va a llamar cuando se intente dejar una ruta
   // el metodo ( .canDeactivate() ) esta en el componente q se intenta dejar, en este cso " EditServerComponent "
   canDeactivate(
      component: CanComponentDeactivate,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
   ): Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate();
   }
}

// las guards las tengo q dar de alta en providers de app.module
