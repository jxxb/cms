import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';
import { MessageService } from '../message.service';
import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@ViewChild('subject') subjectR: ElementRef;
@ViewChild('msgText') messageR: ElementRef;
currentSender: Contact;
 
  constructor(private MsgService:MessageService,private contactService:ContactService) { }

  ngOnInit() {
    this.contactService.getContact('101').subscribe(
      response=>
      {this.currentSender=response.contact;
      })
} 

onSendMessage() { 
  const sbj = this.subjectR.nativeElement.value;
  const msg = this.messageR.nativeElement.value;
  const newMessage:Message = new Message(
    '',
    '',
    sbj,
    msg, 
    this.currentSender
    );
  this.MsgService.addMessage(newMessage);
  this.onClear();
  }

onClear() {
  this.subjectR.nativeElement.value = '';
  this.messageR.nativeElement.value = '';
}
}