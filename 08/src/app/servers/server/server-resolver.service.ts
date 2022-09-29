// resolver
// codigo q corre antes de q se carge una ruta, para asegurarse de q ( la ruta ) tenga la data necesaria

// Resolver envuelve la data q se va a obtener ( lo que se pasa al tipo < ... > )
// tengo q hacerlo @Injectable() porque es un servicio al q se le va a inyectar un servicio

import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   Resolve,
   RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';

interface Server {
   id: number;
   name: string;
   status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
   constructor(private serversService: ServersService) {}

   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Server | Observable<Server> | Promise<Server> {
      return this.serversService.getServer(+route.params['id']);
   }
}
