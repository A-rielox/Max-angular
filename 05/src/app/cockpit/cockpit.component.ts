import {
   Component,
   ElementRef,
   EventEmitter,
   OnInit,
   Output,
   ViewChild,
} from '@angular/core';

@Component({
   selector: 'app-cockpit',
   templateUrl: './cockpit.component.html',
   styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
   // newServerName = '';
   // newServerContent = '';

   // { static: true } para usarlo tb en ngOnInit, de esta forma tengo acceso directo y en todo momento el elemento mediante .nativeElement
   @ViewChild('serverContentInput', { static: true })
   serverContentInput: ElementRef;

   // para pasar el event hacia el parent ( estas 2 son properties )
   @Output() serverCreated = new EventEmitter<{
      serverName: string;
      serverContent: string;
   }>();
   @Output('bpCreated') blueprintCreated = new EventEmitter<{
      serverName: string;
      serverContent: string;
   }>();

   constructor() {}

   ngOnInit(): void {}

   onAddServer(nameInput: HTMLInputElement) {
      this.serverCreated.emit({
         serverName: nameInput.value,
         serverContent: this.serverContentInput.nativeElement.value,
      });
   }

   onAddBlueprint(nameInput: HTMLInputElement) {
      this.blueprintCreated.emit({
         serverName: nameInput.value,
         serverContent: this.serverContentInput.nativeElement.value,
      });
   }
}
