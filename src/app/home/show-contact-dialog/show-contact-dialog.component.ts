import {MAT_DIALOG_DATA} from '@angular/material'
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-show-contact-dialog',
  templateUrl: './show-contact-dialog.component.html',
  styleUrls: ['./show-contact-dialog.component.css']
})
export class ShowContactDialogComponent implements OnInit {

private name: string;
private email: string;
private number: string;
private id: string;


  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
      this.name = this.data.contact.name;
      this.email = this.data.contact.email;
      this.number = this.data.contact.number;
      this.id = this.data.contact.id;

  }

}
