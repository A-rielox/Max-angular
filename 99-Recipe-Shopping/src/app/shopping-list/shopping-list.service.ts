// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
   // ingredientsChanged = new EventEmitter<Ingredient[]>();
   ingredientsChanged = new Subject<Ingredient[]>();
   startedEditing = new Subject<number>();

   private ingredients: Ingredient[] = [
      new Ingredient('apples', 5),
      new Ingredient('tomatoes', 10),
   ];

   getIngredients() {
      // al añadir un ingrediente este se pone el la lista original, no en la copia, xeso tengo q emitir el evento
      return this.ingredients.slice();
   }

   getIngridient(index: number) {
      return this.ingredients[index];
   }

   addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      // this.ingredientsChanged.emit(this.ingredients.slice());
      this.ingredientsChanged.next(this.ingredients.slice());
   }

   addIngredients(ingredients: Ingredient[]) {
      // ingredients.forEach((ingredient) => {
      //    this.ingredients.push(ingredient);
      // });                     ------->  EMITE MUCHOS EVENTOS

      this.ingredients.push(...ingredients);
      // this.ingredientsChanged.emit(this.ingredients.slice());
      this.ingredientsChanged.next(this.ingredients.slice());
   }

   updateIngredient(index: number, newIngredient: Ingredient) {
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());
   }

   deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
   }
}
