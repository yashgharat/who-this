import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateContactDialogComponent } from './create-contact-dialog/create-contact-dialog.component'
import { RequestHelperService } from '../shared/services/request-helper.service'
import { DataSource } from '@angular/cdk/collections';
import { Contact, getContact } from '../shared/services/contact'
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../shared/services/auth.service'
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterContentInit {

  tableColumns: string[] = ['dp','name', 'email', 'phone', 'actions'];
  dataSource = []
  private loading = false;
  private flag = false;

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

  getContacts(){
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

  contactClick() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateContactDialogComponent, { width: '700px' });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
