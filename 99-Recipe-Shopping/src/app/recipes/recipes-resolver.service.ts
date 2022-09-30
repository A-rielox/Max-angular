// resolver
// codigo q corre antes de q se carge una ruta, para asegurarse de q ( la ruta ) tenga la data necesaria

import { Injectable } from '@angular/core';
import {
   ActivatedRouteSnapshot,
   Resolve,
   RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
   constructor(
      private dataStorageService: DataStorageService,
      private recipeService: RecipeService
   ) {}

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const recipes = this.recipeService.getRecipes();

      if (recipes.length === 0) {
         return this.dataStorageService.fetchRecipes();
      } else {
         return recipes;
      }

      // no necesito hacer al suscripcion a "fetchRecipes();" xq el "resolve(..." la hace
   }

   // recordar que tengo q especificar el resolve en la ruta el app-routing.module.ts
   // {
   //    path: ':id',
   //    component: RecipeDetailComponent,
   //    resolve: [RecipesResolverService],
   // }

   // con tipo
   /* resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
      return this.dataStorageService.fetchRecipes();
      // no necesito hacer al suscripcion a "fetchRecipes();" xq el "resolve(..." la hace
   } */
}
