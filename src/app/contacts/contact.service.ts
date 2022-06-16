import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DocumentListComponent } from '../documents/document-list/document-list.component';
// import { MessageService } from '../messages/message.service';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  maxContactId:number;
  private contacts: Contact[] = [];

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(){
    return this.contacts.slice();
  }

  getContact(id: string){
    return this.contacts.find((contact) => contact.id === id);
  }   

  deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  getMaxId():number{
    let maxId = 0;
    for(let contact of this.contacts){
      let currentId = +contact.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact){
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    let contactListClone = this.contacts.slice();

    this.contactChangedEvent.next(contactListClone);
  }
  
  updateContact(originalContact:Contact, newContact: Contact) {
    if(!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
      if(pos<0){
        return;
      }
    
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactListClone);
  }
}