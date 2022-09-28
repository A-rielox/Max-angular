import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
   selector: 'app-recipe-list',
   templateUrl: './recipe-list.component.html',
   styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
   recipes: Recipe[];
   private recipeChangedSub: Subscription; // 🥎

   constructor(
      private recipeService: RecipeService,
      private router: Router,
      private route: ActivatedRoute
   ) {}

   ngOnInit() {
      this.recipes = this.recipeService.getRecipes();

      this.recipeChangedSub = this.recipeService.recipesChanged.subscribe(
         (recipes: Recipe[]) => {
            this.recipes = recipes;
         }
      );
   }

   onNewRecipe() {
      this.router.navigate(['new'], { relativeTo: this.route });
   }

   ngOnDestroy(): void {
      this.recipeChangedSub.unsubscribe();
   }
}

/* 
this.router.navigate(['edit'], {
         relativeTo: this.route,
         queryParamsHandling: 'preserve',
      });
 */
