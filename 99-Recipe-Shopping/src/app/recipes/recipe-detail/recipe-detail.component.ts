import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
   selector: 'app-recipe-detail',
   templateUrl: './recipe-detail.component.html',
   styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
   recipe: Recipe;
   id: number;

   constructor(
      private recipeService: RecipeService,
      private router: Router,
      private route: ActivatedRoute
   ) {}

   // 🎨
   ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
         this.id = +params['id'];

         this.recipe = this.recipeService.getRecipe(this.id);
      });
   }

   onAddToShoppingList() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
   }

   onEditRecipe() {
      // this.router.navigate(['edit'], { relativeTo: this.route });
      // EL DE ARRIBA FUNCIONA BIEN Y ES COMO DEBERIA HACERSE, PERO PARA SABER COMO HACERLO EN CASO DE TENER Q IR A OTRA RUTA MAS COMPLEJA
      this.router.navigate(['../', this.id, 'edit'], {
         relativeTo: this.route,
      });
   }

   onDeleteRecipe() {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
   }
}

// 🎨
// como para cargar esta pagina dependo dq ya tenga las recetas, y si estoy en la ruta y hago reload no la voy a tener, puse un resolver para q haga fetch de las recetas antes de cargar la ruta
// recordar que tengo q especificar el resolve en la ruta el app-routing.module.ts
// {
//    path: ':id',
//    component: RecipeDetailComponent,
//    resolve: [RecipesResolverService],
// }
