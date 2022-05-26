import { Injectable, EventEmitter } from '@angular/core';
// import { MessageService } from '../messages/message.service';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelected = new EventEmitter<Contact>();

  private contacts: Contact[] = [];
  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(){
    return this.contacts.slice();
  }

  getContact(id: string){
    return this.contacts.find((contact) => contact.id === id);
  }   
}