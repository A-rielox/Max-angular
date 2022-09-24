import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
   // con esta no necesito meterlo en providers: [], en app.module
   providedIn: 'root',
})
export class UserService {
   // activatedEmitter = new EventEmitter<boolean>();
   activatedEmitter = new Subject<boolean>();

   constructor() {}
}

// si en un componente lo uso para @Output --> uso EventEmitter
// el Subject lo uso solo para comunicarme entre componentes a traves de services
