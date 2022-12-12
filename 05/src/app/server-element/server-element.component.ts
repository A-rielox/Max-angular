import {
   AfterContentInit,
   AfterViewInit,
   Component,
   ContentChild,
   ElementRef,
   Input,
   OnInit,
   ViewChild,
} from '@angular/core';

@Component({
   selector: 'app-server-element',
   templateUrl: './server-element.component.html',
   styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent
   implements OnInit, AfterContentInit, AfterViewInit
{
   @Input('srvElement') element: {
      name: string;
      type: string;
      content: string;
   };
   @Input() name: string;
   // { static: true } para acceder a el en el ngOnInit
   @ViewChild('heading', { static: true }) header: ElementRef;
   // esta en una referencia a la q accedo mediante <ng-content></ng-content> en el html de este componente ( en el de arriba es con viewChild xq esta en el html de este )
   @ContentChild('contentParagraph', { static: true })
   paragraph: ElementRef;

   constructor() {}

   // 1ro
   ngOnInit(): void {
      // vacio
      // console.log(this.header.nativeElement.textContent);
   }

   // 2do
   ngAfterContentInit() {
      // se pasa como contenido, xlo q a partir de aqui lo puedo ver
      // console.log(this.paragraph.nativeElement);
   }

   // 3ro
   ngAfterViewInit() {
      // este me da acceso a lo q se pone en el html
      // el elemento
      // console.log(this.header.nativeElement.textContent);
   }
}
