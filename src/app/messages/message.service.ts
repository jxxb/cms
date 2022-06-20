import { Message } from './messages.model';
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number;
  private messages: Message[] = [];

  constructor(private http:HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMaxId():number{
    let maxId = 0;
    for (let message of this.messages){
      let currentId = +message.id;
      if(currentId>maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages(){
    const messages = JSON.stringify(this.getMessages());
    this.http.put('https://angular-7a03c-default-rtdb.firebaseio.com/messages.json',messages).subscribe(()=>{
      this.messageChangedEvent.next(this.messages.slice());
      }
    )
  }

  getMessages(){
    this.http.get('https://angular-7a03c-default-rtdb.firebaseio.com/messages.json').subscribe(
      (messages:Message[]=[])=>{
        this.messages=messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a,b)=>
          a.sender > b.sender ? 1 : b.sender > a.sender ? -1 : 0
        )
      } 
    )
    return this.messages.slice();
  }

  getMessage(id:string){
    return this.messages.find((message) => message.id === id);
  }

  addMessage(message: Message) {
  this.messages.push(message);
  this.storeMessages();
}

}
