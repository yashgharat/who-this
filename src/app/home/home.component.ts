import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateContactDialogComponent } from './create-contact-dialog/create-contact-dialog.component'
import { RequestHelperService } from '../shared/services/request-helper.service'
import { Contact, getContact } from '../shared/services/contact'
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
      public dialog: MatDialog,
      private client: RequestHelperService,
      private authService: AuthService
    ) {}

  ngOnInit() {
      this.client.getContacts(this.authService.getCurrentUser()).subscribe(
          (data: getContact) => {
              console.log(data);
          });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateContactDialogComponent, {width: '700px'});
  }

}
