import { Pipe, PipeTransform } from '@angular/core';
// para poder ocuparla tengo q ponerla en declarations en app.module

@Pipe({
   name: 'order',
   pure: false,
})
export class OrderPipe implements PipeTransform {
   transform(value: any, propName: string): any {
      // return value.sort((a, b) => {
      //    if (a[propName] > b[propName]) {
      //       return 1;
      //    } else {
      //       return -1;
      //    }
      // });

      // x nombre a -> z
      return value.sort((a, b) => a.name.localeCompare(b.name));
   }
}
