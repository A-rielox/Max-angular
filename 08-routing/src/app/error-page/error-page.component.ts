import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
   selector: 'app-error-page',
   templateUrl: './error-page.component.html',
   styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
   errorMessage: string;

   constructor(private route: ActivatedRoute) {}

   ngOnInit(): void {
      // con .data en el router le paso info estatica al componente
      // .data['message'] data la defini en app-routing.module.ts
      // this.errorMessage = this.route.snapshot.data['message'];
      this.route.data.subscribe((data: Data) => {
         this.errorMessage = data['message'];
      });
   }
}
