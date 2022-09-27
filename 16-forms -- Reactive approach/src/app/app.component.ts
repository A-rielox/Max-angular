import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
   genders = ['male', 'female'];
   signupForm: FormGroup;
   forbiddenUsernames = ['Chris', 'Anna'];

   ngOnInit() {
      this.signupForm = new FormGroup({
         // el 1er arg es el valor default, podria ser "Default User"
         userData: new FormGroup({
            // username: new FormControl(null, Validators.required),
            username: new FormControl(null, [
               Validators.required,
               this.forbiddenNames.bind(this),
            ]),
            email: new FormControl(null, [
               Validators.required,
               Validators.email,
            ]),
         }),

         gender: new FormControl('male'),
         hobbies: new FormArray([]),
      });
   }

   onSubmit() {
      // en responsive approach NO necesito la reference ( #f ) para acceder a la forma
      console.log(this.signupForm.value);
      // {username: 'Arielox', email: 'test1@test1.com', gender: 'female'}
   }

   onAddHobbie() {
      const control = new FormControl(null, Validators.required);
      (<FormArray>this.signupForm.get('hobbies')).push(control);
   }

   // el custom validator
   forbiddenNames(control: FormControl): { [s: string]: boolean } {
      if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
         return { nameIsForbidden: true };
      }

      // validator superado
      return null;
   }
}
