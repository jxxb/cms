import { Message } from './messages.model';
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChanged = new EventEmitter<Message[]>();

  private messages: Message[] = [];
  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(){
    return this.messages.slice();
  }

  getMessage(id:string){
    return this.messages.find((message) => message.id === id);
  }

  addMessage(message: Message) {
    // for (let message of messages) {
    //   this.addMessage(message);
    // }
  this.messages.push(message);
  this.messageChanged.emit(this.messages.slice());
}


}
