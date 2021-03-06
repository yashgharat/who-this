import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateContactDialogComponent } from './create-contact-dialog/create-contact-dialog.component'
import { ShowContactDialogComponent } from './show-contact-dialog/show-contact-dialog.component'
import { RequestHelperService } from '../shared/services/request-helper.service'
import { DataSource } from '@angular/cdk/collections';
import { Contact, sendContact } from '../shared/services/contact'
import { Observable, observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../shared/misc/confirm-dialog/confirm-dialog.component';
import {
  startWith,
  map,
  debounceTime,
  mergeMapTo,
  mergeMap,
  switchMap,
  catchError
} from 'rxjs/operators';

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

  public filteredContacts: Observable<Contact> = null;
  public searchControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private client: RequestHelperService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.getContacts(2000);

    this.filteredContacts = this.searchControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          return this.searchContact(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    );
  }

  ngAfterContentInit() {

  }

  getContacts(ms: number) {
    (async () => {
      // Do something before delay
      console.log('before delay')
      await this.delay(ms);
      this.client.getContacts(this.authService.getCurrentUser())
        .subscribe(
          (data) => {
            this.dataSource = data;
            console.log(this.dataSource);
          });
    })();
  }

  showMe()
  {
      this.client.getUser(this.authService.getCurrentUser())
        .subscribe(
            (res) => {
                let data = res[0];
                const me: Contact = {
                    "id": data.uid ,
                    "name": data.first_name + " " + data.last_name,
                    "number": data.number,
                    "email": data.email
                }
                console.log("HERE", data);
                const dialogRef = this.dialog.open(ShowContactDialogComponent, { width: '700px', data: { contact: me } });
                dialogRef.afterClosed().subscribe(() => {
                  this.getContacts(500);
                });
            }
        )
  }

  contactClick(row: any) {
    if (!this.flag) {
      const dialogRef = this.dialog.open(ShowContactDialogComponent, { width: '700px', data: { contact: row } });
      dialogRef.afterClosed().subscribe(() => {
        this.searchControl.setValue("");
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

  deleteConfirm() {
    const dialogData = new ConfirmDialogModel("Confirm Delete", "Are you sure?");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true)
        this.deleteContact();
    });
  }

  deleteContact() {
    console.log(this.selected);

    this.client.deleteContact(this.authService.getCurrentUser(), this.selected.id)
      .subscribe(
        (data: Contact) => {
          console.log(data);
          this.getContacts(500);
        }
      );
  }

  searchContact(query: string): Observable<Contact> {
    return this.client.searchContact(this.authService.getCurrentUser(), query).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
  }

  disablePop() {
    this.flag = true;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
