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

   suggestUserName() {
      const suggestedName = 'Superuser';
   }

   onSubmit(form: NgForm) {
      // console.log(form.value);
      // {username: 'Arielox', email: 'test1@test1.com', secret: 'teacher'}
      console.log(form.value);
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
