import { Component } from '@angular/core';
// import { RecipeService } from './recipe.service';

@Component({
   selector: 'app-recipes',
   templateUrl: './recipes.component.html',
   styleUrls: ['./recipes.component.css'],
   // providers: [RecipeService], al ponerlo aca al navegar afura de las recipesss, se destruye la instancia y me resetea las recipes ( al ir a shoppingList ), necesito ponerla en appModule, para q la misma instancia se mantenga en las distintas rutas
})
export class RecipesComponent {
   constructor() {}
}
