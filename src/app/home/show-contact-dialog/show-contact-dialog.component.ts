import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { RequestHelperService } from '../../shared/services/request-helper.service'
import { Contact } from '../../shared/services/contact'
import { AuthService } from '../../shared/services/auth.service'

import { CreateContactDialogComponent} from '../create-contact-dialog/create-contact-dialog.component'


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
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog,
      private dialogRef: MatDialogRef<ShowContactDialogComponent>,
      private requestHelper: RequestHelperService,
      private authService: AuthService
  ) { }

  ngOnInit() {
      this.name = this.data.contact.name;
      this.email = this.data.contact.email;
      this.number = this.data.contact.number;
      this.id = this.data.contact.id;

  }

  onEdit(){
    const dialogRef = this.dialog.open(CreateContactDialogComponent, { width: '700px', data: this.data.contact });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  onDelete(){
    this.requestHelper.deleteContact(this.authService.getCurrentUser(), this.id)
    .subscribe(
        (data: Contact) => {
            console.log(data);
            this.dialogRef.close();
        }
    );

  }

}
