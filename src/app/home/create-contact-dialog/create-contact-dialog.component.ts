import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../home.component'

@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.css']
})
export class CreateContactDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreateContactDialogComponent>){ }

  ngOnInit() {
  }

  onCancel() {
      this.dialogRef.close();
  }

}
