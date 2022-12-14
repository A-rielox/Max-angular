import { Pipe, PipeTransform } from '@angular/core';
// para poder ocuparla tengo q ponerla en declarations en app.module

// pure: false para q se corra cada q cambia la data, de esta forma si tengo puesto el filtro y agrego server => me los va a poner de acuerdo al filtro
// => hace q se recalcule cuando algo cambia en la pagina
@Pipe({
   name: 'filter',
   pure: false,
})
export class FilterPipe implements PipeTransform {
   transform(value: any, filterString: string, propName: string): any {
      // value es todo el array
      if (value.length === 0 || filterString === '') {
         return value;
      }

      const resultArray = [];
      for (const item of value) {
         // server.status === lo-q-pongo-en-el-filtro (stable)
         if (item[propName] === filterString) {
            resultArray.push(item);
         }
      }
      return resultArray;
   }
}

// <input type="text" [(ngModel)]="filteredStatus" />
// *ngFor="let server of servers | filter: filteredStatus:'status'"
