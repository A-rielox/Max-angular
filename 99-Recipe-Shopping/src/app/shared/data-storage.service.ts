import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

// debe llevar el @Injectable si voy a inyectar un service en un service
@Injectable({
   providedIn: 'root',
})
export class DataStorageService {
   private url =
      'https://ng-course-recipe-book-40da9-default-rtdb.firebaseio.com/';

   constructor(
      private http: HttpClient,
      private recipeService: RecipeService
   ) {}

   storeRecipes() {
      const recipes = this.recipeService.getRecipes();

      // put mete todas las q pase y sobreescribe lo q haya ( es de firebase )
      this.http.put(this.url + 'recipes.json', recipes).subscribe((res) => {
         console.log(res);
      });
   }

   fetchRecipes() {
      return this.http.get<Recipe[]>(this.url + 'recipes.json').pipe(
         map((recipes) => {
            return recipes.map((recipe) => {
               return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : [],
               };
            });
         }),
         tap((res) => {
            // console.log(res); // [{…}, {…}]
            this.recipeService.setRecipes(res);
         })
      );

      // el map (de rxjs) es por si hay una receta q no tiene ingredients, para q de todas maneras tenga un array para q no mande errores si llamo un metodo sobre el array
   }
}
