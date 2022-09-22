import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
   constructor(private router: Router) {}

   ngOnInit() {}

   onLoadServers() {
      // para navegar de forma "programativa", necesito injectar el router
      this.router.navigate(['/servers']);
   }
}

// '/servers' con comillas es absolute path ( se agrega despues del root ( en este caso localhost:234234234 ) )
// sin comillas es relative y simplemente se agrega al q ya este puesto
