import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateContactDialogComponent } from './create-contact-dialog/create-contact-dialog.component'
import { ShowContactDialogComponent } from './show-contact-dialog/show-contact-dialog.component'
import { RequestHelperService } from '../shared/services/request-helper.service'
import { DataSource } from '@angular/cdk/collections';
import { Contact, sendContact } from '../shared/services/contact'
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../shared/services/auth.service'
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterContentInit {

  tableColumns: string[] = ['dp', 'name', 'email', 'phone', 'actions'];
  dataSource = []
  private flag = false;
  private selected: any;

  constructor(
    public dialog: MatDialog,
    private client: RequestHelperService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  ngAfterContentInit() {

  }

  getContacts() {
    (async () => {
      // Do something before delay
      console.log('before delay')
      await this.delay(2000);
      this.client.getContacts(this.authService.getCurrentUser())
        .subscribe(
          (data) => {
            this.dataSource = data;
            console.log(this.dataSource);
          });
    })();
  }

  contactClick(row: any) {
    if (!this.flag) {
      const dialogRef = this.dialog.open(ShowContactDialogComponent, { width: '700px', data: { contact: row } });
      dialogRef.afterClosed().subscribe(() => {
        this.getContacts();
      });
    }
    else {
      this.selected = row;
      this.flag = false;
    }
  }

  createContact(): void {
    const dialogRef = this.dialog.open(CreateContactDialogComponent, { width: '700px' });
    dialogRef.afterClosed().subscribe(() => {
      this.getContacts();
    });


  }

  editContact() {
    const dialogRef = this.dialog.open(CreateContactDialogComponent, { width: '700px', data: this.selected });
    dialogRef.afterClosed().subscribe(() => {
      this.getContacts();
    });
  }

  deleteContact() {
    console.log(this.selected);

    this.client.deleteContact(this.authService.getCurrentUser(), this.selected.id)
      .subscribe(
        (data: Contact) => {
          console.log(data);
          this.getContacts();
        }
      );
  }

  disablePop() {
    this.flag = true;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
