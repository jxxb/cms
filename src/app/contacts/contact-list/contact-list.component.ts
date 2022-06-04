import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(private ContactService: ContactService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contacts = this.ContactService.getContacts();
    this.ContactService.contactChangedEvent.subscribe(
      (contacts:Contact[]) => {
        this.contacts = contacts;
      }
    )
  }

  // ngOnDestroy() : void {
  //   this.
  // }

  onNew() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
