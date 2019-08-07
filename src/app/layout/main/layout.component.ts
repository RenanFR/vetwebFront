import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vetweb-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  ngOnInit(): void {
    document.body.classList.remove('bg-dark');
  }

}
