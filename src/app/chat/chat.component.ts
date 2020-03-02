import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
    }

}