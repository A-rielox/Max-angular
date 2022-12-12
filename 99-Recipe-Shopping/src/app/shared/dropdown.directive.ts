import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
   selector: '[appDropdown]',
})
export class DropdownDirective {
   // va a añadir ( o quitar ) la clase " open " al hacer click, 'class' es el array de todas las clases en el elemento
   // yellow 🟡 cuando isOpen es true la pone, cuando false => la saca y con cada click togglea el valor
   @HostBinding('class.open') isOpen = false;

   constructor() {}

   @HostListener('click') toggleOpen() {
      this.isOpen = !this.isOpen;
   }
}

// tengo q declararla en appModule para utilizarla

/*       para poder cerrarla haciendo click en cualquier lado de afuera

export class DropdownDirective {
   @HostBinding('class.open') isOpen = false;

   constructor(private elRef: ElementRef) {}

   // @HostListener('click') toggleOpen() {
   //    this.isOpen = !this.isOpen;
   // }

   @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
      this.isOpen = this.elRef.nativeElement.contains(event.target)
         ? !this.isOpen
         : false;
   }
}
*/
