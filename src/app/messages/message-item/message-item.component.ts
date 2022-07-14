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
  messageSender: String;
  constructor(private ContactService:ContactService) { }

  ngOnInit(): void {

    this.ContactService.getContact(this.message.sender.id).subscribe(
      (responseData)=>{
          this.messageSender = responseData.contact.name;
          console.log(this.messageSender);
      }
    )
  }

}
