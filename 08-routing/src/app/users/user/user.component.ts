import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
   user: { id: number; name: string };

   constructor(private route: ActivatedRoute) {}

   ngOnInit() {
      this.user = {
         // con snapshot no se me va a actualizar si ya me encuentro en la ruta y solo cambian los params
         id: this.route.snapshot.params['id'],
         name: this.route.snapshot.params['name'],
      };

      // .route.params este params es un "observable", y si me suscribo => se va a actualizar ( realizar la accion ) cada q cambien los params
      this.route.params.subscribe((params: Params) => {
         this.user.id = params['id'];
         this.user.name = params['name'];
      });
   }
}
