import {
   Component,
   ElementRef,
   EventEmitter,
   OnInit,
   Output,
   ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
   selector: 'app-shopping-edit',
   templateUrl: './shopping-edit.component.html',
   styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
   @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
   @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

   @Output() ingredientAdded = new EventEmitter<Ingredient>();

   constructor() {}

   ngOnInit(): void {}

   onAddItem(event) {
      event.preventDefault();
      const ingName = this.nameInputRef.nativeElement.value;
      const ingAmount = this.amountInputRef.nativeElement.value;
      const newIngredient = new Ingredient(ingName, ingAmount);

      this.ingredientAdded.emit(newIngredient);
   }
}

// @ViewChild('serverContentInput', { static: true })
// serverContentInput: ElementRef;