import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  maxContactId:number;
  private contacts: Contact[] = [];

  constructor(private http:HttpClient) { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  storeContacts(){
    const contacts = JSON.stringify(this.getContacts());
    this.http.put('https://angular-7a03c-default-rtdb.firebaseio.com/contacts.json', contacts).subscribe(
      ()=>{
        this.contactChangedEvent.next(this.contacts.slice());
      }
    )
  }

  getContacts(){
    this.http.get('https://angular-7a03c-default-rtdb.firebaseio.com/contacts.json').subscribe(
      (contacts:Contact[]=[])=>{
        this.contacts=contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a,b)=>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        this.contactChangedEvent.next(this.contacts.slice());
      }, (error:any)=>{
        console.log(error);
      }
    );
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
    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
  }
}