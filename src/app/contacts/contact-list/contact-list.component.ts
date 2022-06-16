import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
    this.ContactService.contactChangedEvent
    .subscribe(
      (contacts:Contact[]) => {
        this.contacts = contacts;
      }
    );

    this.contacts = this.ContactService.getContacts();
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  // onNew() {
  //   this.router.navigate(['new'], {relativeTo: this.route});
  // }
}
