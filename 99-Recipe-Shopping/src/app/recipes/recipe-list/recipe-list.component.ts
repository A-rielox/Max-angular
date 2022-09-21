import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
   @Output() recipeWasSelected = new EventEmitter<Recipe>();

   recipes: Recipe[] = [
      new Recipe(
         'Recipe Uno',
         'Uno uno uno uno uno',
         'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/chana-masala-recipe-500x500.jpg'
      ),
      new Recipe(
         'Recipe Dos',
         'Dos dos dos dos dos dos dos',
         'https://www.simplyrecipes.com/thmb/RheeF949ewwGy7pxQQNt5v63Oi0=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg'
      ),
   ];

   onRecipeSelected(recipe: Recipe) {
      this.recipeWasSelected.emit(recipe);
   }
}
