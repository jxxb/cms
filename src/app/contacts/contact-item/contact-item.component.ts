import { Component, OnInit, Input } from '@angular/core';
// import { EventEmitter } from 'stream';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Input() index: number;

  constructor() { }
  ngOnInit(): void {
  }

}
