import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
   selector: '[appUnless]',
})
export class UnlessDirective {
   // set para q cada q cambie la condicion se ejecute el metodo
   @Input() set appUnless(condition: boolean) {
      if (!condition) {
         this.vcRef.createEmbeddedView(this.templateRef);
      } else {
         this.vcRef.clear();
      }
   }

   constructor(
      private templateRef: TemplateRef<any>,
      private vcRef: ViewContainerRef
   ) {}
}

// para ocuparla la tengo q declarar en appModule
// import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';

// @NgModule({
//    declarations: [AppComponent, BasicHighlightDirective], ...
