import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './messages.model';

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  selectedMessage: Message;


  constructor(private MessageServices:MessageService) { }

  ngOnInit(): void {
    this.MessageServices.messageChanged.subscribe(
      (message:Message) => {
        this.selectedMessage = message;
      }
    )
  }

}
