import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    // new Message('1', 'Homework', 'Hi There', 'Jeff'),
    // new Message('2', 'Work', 'I need your help', 'Steve')
  ];
    
  

  constructor(private MessageService:MessageService) { }

  ngOnInit(): void {
    this.MessageService.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      ) 
    this.messages = this.MessageService.getMessages();
  }
}
