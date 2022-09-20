import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
   selector: '[appBasicHighlight]',
})
export class BasicHighlightDirective implements OnInit {
   // las injecta Angular, elementRef es la referencia al elemento en el cual se va a poner la directiva
   constructor(private elementRef: ElementRef) {}

   ngOnInit() {
      this.elementRef.nativeElement.style.backgroundColor = 'green';
      this.elementRef.nativeElement.style.padding = '10px';
   }
}

//  PARA ACCEDER Y MODIFICAR ELEMENTOS ES MEJOR CON Renderer2 q de esta manera

// para ocuparla la tengo q declarar en appModule
// import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';

// @NgModule({
//    declarations: [AppComponent, BasicHighlightDirective], ...
