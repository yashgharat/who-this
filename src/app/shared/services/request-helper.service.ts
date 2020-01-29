import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact, getContact } from './contact'


@Injectable({
  providedIn: 'root'
})
export class RequestHelperService {
  private baseURL: String = "https://us-central1-whothis-1599c.cloudfunctions.net/app/api/";
  constructor(private client: HttpClient) {
  }

  createContact(contact: Contact): Observable<Contact> {
    if (contact.contact_name !== "") {
      return this.client.post<Contact>(this.baseURL + 'create-contact', contact, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
    }
    else {
        console.log("null requestHelper in postHelper()");
    }
  }

  getContacts(user: string): Observable<getContact> {
      return this.client.get<getContact>(this.baseURL + "read/" + user);
  }
}
