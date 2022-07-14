import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription:Subscription;
  constructor(private MessageService:MessageService) { }

  ngOnInit(): void {
    this.subscription = this.MessageService.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
      this.MessageService.getMessages();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
