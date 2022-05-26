import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService],
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor(private ContactServices:ContactService) { }


  ngOnInit(): void {
    this.ContactServices.contactSelected
    .subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    )
  }

}
