import { Component, OnInit, Inject, EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeComponent } from '../home.component'
import { RequestHelperService } from '../../shared/services/request-helper.service'
import { Contact } from '../../shared/services/contact'
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/services/auth.service'


@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.css']
})
export class CreateContactDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<CreateContactDialogComponent>,
      private requestHelper: RequestHelperService,
      private authService: AuthService
        ){ }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.email])
  });

  ngOnInit() {
  }

  onCancel() {
      this.dialogRef.close();
  }

  onSave(){
      const newContact: Contact = {
          "user": this.authService.getCurrentUser(),
          "contact_name": this.form.controls['name'].value,
          "contact_number": this.form.controls['phone'].value,
          "contact_email": this.form.controls['email'].value
      }

    this.requestHelper.createContact(newContact).subscribe(
        (data: Contact) => {
            console.log(data);
            this.dialogRef.close();
        }
    );

  }

}
