import { Component } from '@angular/core';

@Component({
   selector: 'app-server',
   templateUrl: './server.component.html',
   styles: [
      `
         .online {
            color: white;
         }
      `,
   ],
})
export class ServerComponent {
   serverId: number = 10;
   serverStatus: string = 'offLine';

   constructor() {
      this.serverStatus = Math.random() > 0.5 ? 'offLine' : 'onLine';
   }

   getServerStatus() {
      return this.serverStatus;
   }

   getColor() {
      return this.serverStatus === 'offLine' ? 'salmon' : 'green';
   }
}
