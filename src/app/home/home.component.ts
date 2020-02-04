import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateContactDialogComponent } from './create-contact-dialog/create-contact-dialog.component'
import { RequestHelperService } from '../shared/services/request-helper.service'
import { DataSource } from '@angular/cdk/collections';
import { Contact, getContact } from '../shared/services/contact'
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/services/auth.service'
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tableColumns: string[] = ['name', 'email', 'phone'];
  dataSource = []
  private contactsArray: getContact[];
  private loading = false;

  constructor(
    public dialog: MatDialog,
    private client: RequestHelperService,
    private authService: AuthService
  ) { }

  ngOnInit() {
      this.getContacts();
      while(this.loading){
          this.dataSource = this.contactsArray;
      }
      console.log("outside", this.contactsArray);
  }

  getContacts() {
      this.loading = true;
    this.client.getContacts(this.authService.getCurrentUser())
      .subscribe(
        (data) => {
            console.log("inside", data);
            this.contactsArray = data;
            this.loading = false;
        });
  }

  contactClick() {
      console.log(this.contactsArray);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateContactDialogComponent, { width: '700px' });
  }

}
