import {
   Directive,
   ElementRef,
   HostBinding,
   HostListener,
   Input,
   OnInit,
   Renderer2,
} from '@angular/core';

@Directive({
   selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
   @Input() defaultColor: string = 'transparent';
   @Input() highlightColor: string = 'blue';

   // se le pasa la propertie del host-element a la cual se le quiere hacer el bind ( la propiedad del elemento en el q la pongo ) ( poner en camel case "backgroundColor" )
   @HostBinding('style.backgroundColor') backgroundColor: string;

   constructor(private elRef: ElementRef, private renderer: Renderer2) {}

   ngOnInit(): void {
      // this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
      this.backgroundColor = this.defaultColor;
   }

   // para escuchar eventos ocurridos en el elemento en el cual se pone la directive
   // mouseenter es el nombre del evento, "mouseover" es solo el nombre q le pongo a la fcn
   @HostListener('mouseenter') mouseover(eventData: Event) {
      // this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
      this.backgroundColor = this.highlightColor;
   }

   @HostListener('mouseleave') mouseleave(eventData: Event) {
      // this.renderer.setStyle(this.elRef.nativeElement,'background-color','transparent');
      this.backgroundColor = this.defaultColor;
   }
}

// para ocuparla la tengo q declarar en appModule
// import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';

// @NgModule({
//    declarations: [AppComponent, BasicHighlightDirective], ...
