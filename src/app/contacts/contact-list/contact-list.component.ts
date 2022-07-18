import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
    this.subscription =
    this.ContactService.contactChangedEvent
    .subscribe(
      (contacts:Contact[]) => {
        this.contacts = contacts;
      }
    );

    this.ContactService.getContacts();
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  search(value:string){
    this.term = value;
  }
}
