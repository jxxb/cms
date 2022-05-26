import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
 
  constructor(private MsgService:MessageService) { }

  ngOnInit(): void {
} 

onSendMessage() { 
  const id = '1';
  const currentSender = "1";
  const sbj = this.subjectR.nativeElement.value;
  const msg = this.messageR.nativeElement.value;
  const newMessage = new Message(id, sbj, msg, currentSender);
  this.MsgService.addMessage(newMessage);
  this.onClear();
  }

onClear() {
  this.subjectR.nativeElement.value = '';
  this.messageR.nativeElement.value = '';
}
}