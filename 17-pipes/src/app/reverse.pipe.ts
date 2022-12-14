import { Pipe, PipeTransform } from '@angular/core';
// para poder ocuparla tengo q ponerla en declarations en app.module

@Pipe({
   name: 'reverse',
})
export class ReversePipe implements PipeTransform {
   transform(value: string): string {
      let reversed = '';

      reversed = value.split('').reverse().join('');

      return reversed;
   }
}
