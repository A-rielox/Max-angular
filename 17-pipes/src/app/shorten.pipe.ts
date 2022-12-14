import { Pipe, PipeTransform } from '@angular/core';
// para poder ocuparla tengo q ponerla en declarations en app.module

@Pipe({ name: 'shorten' })
export class ShortenPipe implements PipeTransform {
   transform(value: any, limit: number) {
      if (value.length > limit) {
         return value.substring(0, limit) + '...';
      }

      return value;
   }
}

/*  SIN PARAMETROS

export class ShortenPipe implements PipeTransform {
   transform(value: any) {
      if (value.length > 10) {
         return value.substring(0, 10) + '...';
      }
   }
}

*/
