import { Component, OnInit, Input } from '@angular/core';
import { WeekDay } from './week.day';

@Component({
  selector: 'vetweb-chat-availability',
  templateUrl: './availability.input.component.html'
})
export class AvailabilityInputComponent implements OnInit {

  @Input() weekDay: WeekDay;

  constructor() { }

  ngOnInit() {
  }

  enableDisable(): void {
    this.weekDay.enabled = !this.weekDay.enabled;
  }

}
