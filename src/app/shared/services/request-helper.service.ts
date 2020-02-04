import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sendContact, Contact } from './contact'
import { interval} from 'rxjs/observable/interval';
import { map, flatMap, timeout, takeWhile } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RequestHelperService {
  private baseURL: String = "https://us-central1-whothis-1599c.cloudfunctions.net/app/api/";
  constructor(private client: HttpClient) {
  }

  createContact(user: string, contact: sendContact): Observable<sendContact> {
    if (contact.contact_name !== "") {
      return this.client.post<sendContact>(this.baseURL + 'create-contact/' + user, contact, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
    }
    else {
      console.log("null requestHelper in postHelper()");
    }
  }

  getContacts(user: string): Observable<Contact[]> {
    return this.client.get<Contact[]>(this.baseURL + "read/" + user)
  }

  deleteContact(user: string, contactID: string): Observable<Contact>{
      if (contactID !== "") {
        return this.client.delete<Contact>(this.baseURL + 'delete/' + user + "/" + contactID);
      }
      else {
        console.log("null requestHelper in deleteHelper()");
      }
  }



}