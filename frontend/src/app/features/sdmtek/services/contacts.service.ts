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

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}`);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}`, contact);
  }
}
