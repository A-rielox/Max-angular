import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
         // el 1er arg es el valor default del field
         userData: new FormGroup({
            // username: new FormControl(null, Validators.required),
            username: new FormControl(null, [
               Validators.required,
               this.forbiddenNames.bind(this),
            ]),
            email: new FormControl(
               null,
               [Validators.required, Validators.email],
               this.forbiddenEmails
            ),
         }),

         gender: new FormControl('male'),
         hobbies: new FormArray([]),
      });

      // OBSERVABLE SE DISPARA CADA QUE SE INGRESA ALGO EN LA FORM ( cada q hay un value change )
      // this.signupForm.valueChanges.subscribe((value) => {
      //    console.log(value);
      // });

      // OBSERVABLE SE DISPARA CADA QUE HAY UN CAMBIO DE STATUS ( como de valid a invalid ), parece q se dispara cada q checa el status
      // this.signupForm.statusChanges.subscribe((status) => {
      //    console.log(status);
      // });

      // TAMBIEN SE PUEDE OCUPAR setValue() y patchValue()
      this.signupForm.setValue({
         userData: {
            username: 'Lel',
            email: 'lel@lel.com',
         },
         gender: 'male',
         hobbies: [],
      });

      this.signupForm.patchValue({
         userData: {
            email: 'lel69@lel.com',
         },
      });
   }

   onSubmit() {
      // en responsive approach NO necesito la reference ( #f ) para acceder a la forma
      console.log(this.signupForm.value);
      // {username: 'Arielox', email: 'test1@test1.com', gender: 'female'}

      // PARA LIMPIAR TRAS EL SUBMIT
      this.signupForm.reset();
      // para q no se elimine el redio button default, se le puede pasar un object para resetear a valores especificos
   }

   onAddHobbie() {
      const control = new FormControl(null, Validators.required);
      (<FormArray>this.signupForm.get('hobbies')).push(control);
   }

   // MI COSECHA PARA QUITAR
   onRemoveHobbie() {
      // const control = new FormControl(null, Validators.required);
      (<FormArray>this.signupForm.get('hobbies')).removeAt(-1);
   }

   // el custom validator
   forbiddenNames(control: FormControl): { [s: string]: boolean } {
      if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
         return { nameIsForbidden: true };
      }

      // validator superado
      return null;
   }

   // validator ASINCRONO
   // si en esta fcn ocupo "this" => arriba dondo pongo el validato TENGO que hacer ".bind(this)"
   forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
      const promise = new Promise<any>((resolve, reject) => {
         setTimeout(() => {
            if (control.value === 'test@test.com') {
               resolve({ emailIsForbidden: true });
            } else {
               resolve(null);
            }
         }, 1500);
      });

      return promise;
   }
}
