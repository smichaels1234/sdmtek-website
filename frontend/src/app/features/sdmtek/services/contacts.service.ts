import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseUrl = '/contact';

  constructor(private http: HttpClient) { }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}`, contact);
  }
}
