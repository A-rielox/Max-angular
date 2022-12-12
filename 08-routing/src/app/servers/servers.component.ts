import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
   selector: 'app-servers',
   templateUrl: './servers.component.html',
   styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
   public servers: { id: number; name: string; status: string }[] = [];

   constructor(
      private serversService: ServersService,
      private router: Router,
      // ActivatedRoute es la ruta actual
      private route: ActivatedRoute
   ) {}

   ngOnInit() {
      this.servers = this.serversService.getServers();
   }

   onReload() {
      // p'q sepa relativo a q agregar la ruta ( xq como esta sin / => se la agrega a la actual, aqui seria 'servers/servers' )
      // this.router.navigate(['servers'], { relativeTo: this.route });
      //  servers/servers
   }
}
