import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
   declarations: [AlertComponent, LoadingSpinnerComponent, DropdownDirective],
   imports: [CommonModule],
   // como esto no lo voy a ocupar aca, sino importarlo y ocuparlo en otros modulos => los tengo q exportar
   exports: [
      AlertComponent,
      LoadingSpinnerComponent,
      DropdownDirective,
      CommonModule,
   ],
})
export class SharedModule {}
