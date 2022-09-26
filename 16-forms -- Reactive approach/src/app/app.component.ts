import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
   genders = ['male', 'female'];
   signupForm: FormGroup;

   ngOnInit() {
      this.signupForm = new FormGroup({
         // el 1er arg es el valor default, podria ser "Default User"
         username: new FormControl(null),
         email: new FormControl(null),
         gender: new FormControl('male'),
      });
   }

   onSubmit() {
      // en responsive approach NO necesito la reference ( #f ) para acceder a la forma
      console.log(this.signupForm.value);
      // {username: 'Arielox', email: 'test1@test1.com', gender: 'female'}
   }
}
