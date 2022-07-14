import { Message } from './messages.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();
  private messages: Message[] = [];
  constructor(private http:HttpClient) { }

  sortAndSend(){
    // this.messages.sort((a,b)=>a.id>b.id?1:b.id>a.id?-1:0)
    this.messageChangedEvent.next(this.messages.slice());
  }  
  
  getMessage(id:string){
    return this.http.get<{message:string, messages:Message}>('http://localhost:3000/messages/' + id);
  }

  getMessages(){
    this.http.get<{message:string,messages:Message[]}>('http://localhost:3000/messages/').subscribe(
      (msgData)=>{
        this.messages=msgData.messages;
        console.log(msgData);
        this.sortAndSend();
      }, (error:any)=>{
        console.log(error);
      }
    );
  }

  addMessage(message: Message) {
    if(!message){
      return;
    }
    message.id='';
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.post<{message:string,msg:Message}>(
      'http://localhost:3000/messages',message,{headers:headers})
      .subscribe((msgData)=>{
        message._id = msgData.msg._id;
        message.id = msgData.msg.id;
        this.messages.push(msgData.msg);
        this.sortAndSend();
      }
    );
}

}
