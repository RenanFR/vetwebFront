import { Component, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'vetweb-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() title: string;

  @Input() message: string;

  @ViewChild('modalSuccess') modalButton: ElementRef<HTMLButtonElement>;

  public open(): void {
    this.modalButton.nativeElement.click();
  }

}
