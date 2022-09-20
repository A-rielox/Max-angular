import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
   recipes: Recipe[] = [
      new Recipe(
         'Recipe Test',
         'test test test test',
         'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/chana-masala-recipe-500x500.jpg'
      ),
      new Recipe(
         'Recipe Test',
         'test test test test',
         'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/chana-masala-recipe-500x500.jpg'
      ),
   ];

   constructor() {}

   ngOnInit(): void {}
}
