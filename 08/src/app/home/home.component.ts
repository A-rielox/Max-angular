import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
   constructor(private router: Router, private authService: AuthService) {}

   ngOnInit() {}

   onLoadServers(id: number) {
      // para navegar de forma "programativa", necesito injectar el router
      this.router.navigate(['/servers', id, 'edit'], {
         queryParams: { allowEdit: 1 },
         fragment: 'loading',
      });
   }

   onLogin() {
      this.authService.login();
   }

   onLogout() {
      this.authService.logout();
   }
}

// '/servers' con comillas es absolute path ( se agrega despues del root ( en este caso localhost:234234234 ) )
// sin comillas es relative y simplemente se agrega al q ya este puesto
