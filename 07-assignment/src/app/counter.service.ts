import { Injectable } from '@angular/core';

@Injectable()
export class CounterService {
   activeToInactive = 0;
   inactiveToActive = 0;

   onActiveToInactive() {
      this.activeToInactive++;
      console.log('Active To Inactive Changes: ' + this.activeToInactive);
   }

   onInactiveToActive() {
      this.inactiveToActive++;
      console.log('Inactive To Active Changes: ' + this.inactiveToActive);
   }
}
