import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../messages.model';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;
  constructor(private ContactService:ContactService) { }

  ngOnInit(): void {
    const contact:Contact = this.ContactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
