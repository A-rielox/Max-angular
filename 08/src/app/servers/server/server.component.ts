import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
   selector: 'app-server',
   templateUrl: './server.component.html',
   styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
   server: { id: number; name: string; status: string };

   constructor(
      private serversService: ServersService,
      private route: ActivatedRoute,
      private router: Router
   ) {}

   ngOnInit() {
      // al buscar en la ruta, lo q me devuelve son strings, y abajo al buscar en .getServer busca con id numero, xeso el + para parsear
      // const id = +this.route.snapshot.params['id'];
      // this.route.params.subscribe((params: Params) => {
      //    this.server = this.serversService.getServer(+params['id']);
      // });
      // this.server = this.serversService.getServer(id);
      //
      // OBTENIENDO EL SERVER CON EL RESOLVER
      // data['server'] es lo q pongo en "resolve: { server: ServerResolver },"
      this.route.data.subscribe((data: Data) => {
         this.server = data['server'];
      });
   }

   onEdit() {
      this.router.navigate(['edit'], {
         relativeTo: this.route,
         queryParamsHandling: 'preserve',
      });
      // queryParamsHandling: 'preserve' es para preservar el queryParameter
   }
}
/* 
{
   path: 'servers',
   component: ServersComponent,
   children: [
      { path: ':id', component: ServerComponent },--> aqui estoy
      { path: ':id/edit', component: EditServerComponent },
   ],
},
*/
