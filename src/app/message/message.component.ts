
import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, ViewChild, NgModule, ElementRef, HostListener, Directive, trigger, state, style, transition, animate } from '@angular/core';
import { MessageModel } from './message.model';
import { ModalDirective } from 'ngx-bootstrap';
// import { PLACEHOLDER } from '../interface/common.constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
export class Animations {
  public static easeInOut =
trigger('rowEaseInOut', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateY(-100px)'
    }),
    animate(300)
  ]),
  transition('* => void', [
    animate(300, style({
      transform: 'translateY(-100px)',
      opacity: 0
    }))
  ])
]);
}
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [ 
    Animations.easeInOut
   ]
})
export class MessageComponent implements OnChanges {
  @Input() msgs: MessageModel;
  @Output() msgsChange: EventEmitter<MessageModel> = new EventEmitter<MessageModel>();
  @Input() life: number;
  messageFadeOut: number = 50000000;
  // placeHolderStr = PLACEHOLDER;
  @Output() onClose: EventEmitter<{isClosed: boolean}> = new EventEmitter<{isClosed: boolean}> ();
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  // @Output() msgsChange: EventEmitter<MessageModel[]> = new EventEmitter<MessageModel[]>();
  constructor( ) { } //private translation: TranslationService
  countPlaceholder(str) {
   // return (str.match(new RegExp(this.placeHolderStr + '' , 'g')) || []).length;
  }
  /*
  changeAndLocalizeMessage() {
    // for (let i = 0; i < this.msgs.length; i++) {
       if (this.msgs && this.msgs.placeHolder) {
         const placeHolderCnt = this.countPlaceholder(this.translation.translate(this.msgs.summary.toString()));
         if ( placeHolderCnt  === this.msgs.placeHolder.length) {
          const arr = this.translation.translate(this.msgs.summary.toString()).split(this.placeHolderStr);
          let finalStr: string;
          finalStr = '';
          for ( let i = 0; i < arr.length; i++ ) {
            if ( this.msgs.placeHolder[i] !== null && this.msgs.placeHolder[i] !== undefined) {
              if (this.msgs.placeHolder[i].toString().indexOf('Message.') !== -1) {
                finalStr  =  finalStr + arr[i] +  this.translation.translate(this.msgs.placeHolder[i]);
              } else {
                finalStr  =  finalStr + arr[i] + this.msgs.placeHolder[i];
              }
            } else {
              finalStr  =  finalStr + arr[i];
            }
          }
          this.msgs.summary = finalStr;
         } else {
           this.msgs.summary = this.translation.translate(this.msgs.summary.toString());
           console.log('placeholder count mismatched');
         }
       } */
      /* if (this.msgs && this.autoShownModal) {
          this.autoShownModal.show();
       }*/
   // }
  /*}*/
  ngOnChanges() {
    if (this.msgs) {
        if (this.msgs.summary && this.msgs.summary !== '') {
         // console.log(this.translation.translate(this.msgs.summary));
          if (this.msgs.summary.toString().indexOf('Message.') !== -1) {
              this.msgs.summary = this.msgs.summary.toString();
              // this.msgs.summary = this.translation.translate(this.msgs.summary.toString());
          }
         // this.changeAndLocalizeMessage();
          if (this.life) {
            this.messageFadeOut = this.life;
          }
          setTimeout(() => {
          /*if (this.autoShownModal) {
              this.autoShownModal.hide();
          } else {*/
            this.msgs = new MessageModel();
            this.msgsChange.emit(this.msgs);
              this.onClose.emit({isClosed: true});
          // }
        }, this.messageFadeOut); 
      }
    }
  }

  public onHidden(): void {
    this.msgs = new MessageModel();
    this.msgsChange.emit(this.msgs);
    this.onClose.emit({isClosed: true});
  }
}

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output('clickOutside') public clickOutside = new EventEmitter();
  @Input('msgs') public msgs;
  constructor(private _elementRef : ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!isClickedInside && this.msgs && this.msgs.severity) {
        console.log('~~~~clickoutside~~~~~');
        this.clickOutside.emit(null);
    }
  }
}

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ModalModule.forRoot()
    ],
    exports: [
      MessageComponent,
      ClickOutsideDirective
    ],
    declarations: [
      MessageComponent,
      ClickOutsideDirective
    ]
})

export class MessageModule {

}