import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent {
   @ViewChild('f') signupForm: NgForm;
   // este valor es el value="" en la option.
   // [ngModel]="defaultQuestion" al cambiar el valor de la opcion NO se actualiza el valor de la variable, para eso se ocupa 2-way-binding
   defaultQuestion = 'pet';
   answer = '';
   genders = ['male', 'female'];
   user = {
      username: '',
      email: '',
      secretQuestion: '',
      answer: '',
      gender: '',
   };
   submitted = false;

   suggestUserName() {
      const suggestedName = 'Superuser';

      // para pasar un valor determinado a la forma ( al picarle un boton o hacer algo )
      // this.signupForm.setValue({
      //    userData: { username: suggestedName, email: '' },
      //    secret: 'pet',
      //    questionAnswer: '',
      //    gender: 'male',
      // });
      // la forma mas recomendada es la sig ( xq esta anterior me sobreescribe lo q ya tengo )
      this.signupForm.form.patchValue({ userData: { username: 'lel' } });
   }

   /* onSubmit(form: NgForm) {
      // console.log(form.value);
      // {username: 'Arielox', email: 'test1@test1.com', secret: 'teacher'}
      console.log(form.value);
   } */
   onSubmit(form: NgForm) {
      // console.log(form.value);
      // {username: 'Arielox', email: 'test1@test1.com', secret: 'teacher'}
      console.log(form.value);

      this.submitted = true;
      this.user.username = this.signupForm.value.userData.username;
      this.user.email = this.signupForm.value.userData.email;
      this.user.secretQuestion = this.signupForm.value.secret;
      this.user.answer = this.signupForm.value.questionAnswer;
      this.user.gender = this.signupForm.value.gender;

      // PARA RESETEAR LA FORMA DESPUES DEL SUBMIT
      this.signupForm.reset();
   }

   // ngModelGroup="userData"
   // en el tamplate me agrupa los input
   // value: Object
   //    questionAnswer: "holi hola"
   //    secret: "pet"
   //    userData: {username: 'Arielox', email: 'test1@test1.com'}

   // en el tamplate
   // ngModel para especificar q es un form-control
   // [ngModel] para poner valor xdefault ( con proprety binding )
   // [(ngModel)] para poner para q tambien se actualize el valor de la variable en el archivo .ts

   // puedo NO pasar la referencia a la form en (ngSubmit)="onSubmit()" y acceder a la form mediante ViewChild
   /* onSubmit() {
      
      console.log(this.signupForm.value);
   } */
}
