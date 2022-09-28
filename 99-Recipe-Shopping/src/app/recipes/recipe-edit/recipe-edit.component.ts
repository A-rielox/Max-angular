import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
   selector: 'app-recipe-edit',
   templateUrl: './recipe-edit.component.html',
   styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
   id: number;
   editMode = false;
   recipeForm: FormGroup;

   constructor(
      private route: ActivatedRoute,
      private recipeService: RecipeService,
      private router: Router
   ) {}

   ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
         this.id = +params['id'];

         //  a este componente llego por /new o /:id/edit xeso
         this.editMode = params['id'] != null;

         // se llama aca xq tiene q ser cada q cambian los params
         this.initForm();
      });
   }

   onSubmit() {
      // const name = this.recipeForm.value.name;
      // const description = this.recipeForm.value.description;
      // const imagePath = this.recipeForm.value.imagePath;
      // const ingredients = this.recipeForm.value.ingredients;
      // const newRecipe = new Recipe(name, description, imagePath, ingredients);

      // el this.recipeForm.value tiene la misma estructura q la Recipe => se la puedo pasar directo
      if (this.editMode) {
         // this.recipeService.updateRecipe(this.id, newRecipe);
         this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      } else {
         this.recipeService.addRecipe(this.recipeForm.value);
      }

      // para navegar una ruta hacia arriba
      this.onCancel();
   }

   onAddIngredient() {
      (<FormArray>this.recipeForm.get('ingredients')).push(
         new FormGroup({
            name: new FormControl(null, Validators.required),
            amount: new FormControl(null, [
               Validators.required,
               Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
         })
      );
   }

   onDeleteIngredient(index: number) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
   }

   onCancel() {
      this.router.navigate(['../'], { relativeTo: this.route });
   }

   private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new FormArray([]);

      if (this.editMode) {
         const recipe = this.recipeService.getRecipe(this.id);
         recipeName = recipe.name;
         recipeImagePath = recipe.imagePath;
         recipeDescription = recipe.description;

         if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
               recipeIngredients.push(
                  new FormGroup({
                     name: new FormControl(
                        ingredient.name,
                        Validators.required
                     ),
                     amount: new FormControl(ingredient.amount, [
                        Validators.required,
                        Validators.pattern(/^[1-9]+[0-9]*$/),
                     ]),
                  })
               );
            }
         }
      }

      this.recipeForm = new FormGroup({
         name: new FormControl(recipeName, Validators.required),
         imagePath: new FormControl(recipeImagePath, Validators.required),
         description: new FormControl(recipeDescription, Validators.required),
         ingredients: recipeIngredients,
      });
   }
}
