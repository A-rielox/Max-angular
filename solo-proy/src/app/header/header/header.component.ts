import {
   Component,
   EventEmitter,
   OnDestroy,
   OnInit,
   Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
   isAuthenticated = false;
   private userSub: Subscription;

   constructor(
      private dataStorageService: DataStorageService,
      private authService: AuthService
   ) {}

   ngOnInit(): void {
      this.userSub = this.authService.user.subscribe((user) => {
         this.isAuthenticated = !!user;
      });
   }

   onSaveData() {
      this.dataStorageService.storeRecipes();
   }

   onFetchData() {
      this.dataStorageService
         .fetchRecipes()
         .subscribe((res) => console.log(res));
   }

   onLogout() {
      this.authService.logout();
   }

   ngOnDestroy(): void {
      this.userSub.unsubscribe();
   }
}
