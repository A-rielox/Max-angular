import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
   providedIn: 'root',
})
export class DataStorageService {
   private url = 'https://maxitorecetas-default-rtdb.firebaseio.com/';

   constructor(
      private http: HttpClient,
      private recipeService: RecipeService,
      private authService: AuthService
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
   }
}
