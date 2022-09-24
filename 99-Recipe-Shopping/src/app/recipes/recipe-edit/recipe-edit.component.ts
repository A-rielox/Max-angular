import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
   selector: 'app-recipe-edit',
   templateUrl: './recipe-edit.component.html',
   styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
   id: number;
   editMode = false;

   constructor(private route: ActivatedRoute) {}

   ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
         this.id = +params['id'];

         //  a este componente llego por /new o /:id/edit xeso
         this.editMode = params['id'] != null;
      });
   }
}
