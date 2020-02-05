import { Component, OnInit, Inject, EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeComponent } from '../home.component'
import { RequestHelperService } from '../../shared/services/request-helper.service'
import { Contact, sendContact } from '../../shared/services/contact'
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/services/auth.service'


@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.css']
})
export class CreateContactDialogComponent implements OnInit {

  private flag = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateContactDialogComponent>,
    private requestHelper: RequestHelperService,
    private authService: AuthService
  ) { }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.email])
  });

  ngOnInit() {

    console.log(this.data);

    if (this.data) {
      this.flag = true;
      this.form.controls['name'].setValue(this.data.name);
      this.form.controls['phone'].setValue(this.data.number);
      this.form.controls['email'].setValue(this.data.email);

    }

  }

  onCancel() {
    console.log(this.authService.getCurrentUser());
    this.dialogRef.close();
  }

  onSave() {
      const newContact: sendContact = {
        "contact_name": this.form.controls['name'].value,
        "contact_number": this.form.controls['phone'].value,
        "contact_email": this.form.controls['email'].value
      }

      console.log(newContact);
    if (!this.flag) {

      this.requestHelper.createContact(this.authService.getCurrentUser(), newContact)
        .subscribe(
          (data: sendContact) => {
            console.log(data);
            this.dialogRef.close();
          }
        );
    }
    else {
      this.requestHelper.updateContact(this.authService.getCurrentUser(), newContact)
        .subscribe(
          (data: sendContact) => {
            this.dialogRef.close();
          }
        );
    }
    this.flag = false;
  }

}
