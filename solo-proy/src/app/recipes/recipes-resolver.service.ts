import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   Resolve,
   RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
   providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
   constructor(
      private dataStorageService: DataStorageService,
      private recipeService: RecipeService
   ) {}

   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
      const recipes = this.recipeService.getRecipes();

      if (recipes.length === 0) {
         return this.dataStorageService.fetchRecipes();
      } else {
         return recipes;
      }

      // no necesito hacer al suscripcion a "fetchRecipes();" xq el "resolve(..." la hace
   }
}
