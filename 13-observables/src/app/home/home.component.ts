import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subscription } from 'rxjs';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
   private firstObsSubscription: Subscription;

   constructor() {}

   ngOnInit() {
      // this.firstObsSubscription = interval(1000).subscribe((count) => {
      //    console.log(count);
      // });

      const customIntervalObservable = Observable.create((observer) => {
         let count = 0;

         setInterval(() => {
            observer.next(count);

            if (count === 5) {
               observer.complete();
            }
            // if (count > 3) {
            //    observer.error(new Error('Count is greater 3!'));
            // }
            count++;
         }, 1000);
      });

      const piped = customIntervalObservable.pipe(
         filter((data: number) => {
            return data % 2 === 0;
         }),
         map((data: number) => {
            return 'Round: ' + (data + 1);
         })
      );

      // this.firstObsSubscription = customIntervalObservable.subscribe(
      this.firstObsSubscription = piped.subscribe(
         (data) => {
            console.log(data);
         },
         (error) => {
            console.log(error);
            // alert(error.message);
         },
         () => {
            console.log('Completed!');
         }
      );
   }

   ngOnDestroy(): void {
      this.firstObsSubscription.unsubscribe();
   }
}
