import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@ViewChild('subject') subject: ElementRef;
@ViewChild('msgText') message: ElementRef;
@Output() addMessageEvent = new EventEmitter<Message>();
 
  constructor() { }

  ngOnInit(): void {
} 

onSendMessage() { 
  const currentSender = "Jared Barney";
  const sbj = this.subject.nativeElement.value;
  const msg = this.message.nativeElement.value;
  const newMessage = new Message('1', sbj, msg, currentSender);
  this.addMessageEvent.emit(newMessage);
  }

onClear() {
  this.subject.nativeElement.value = '';
  this.message.nativeElement.value = '';
}
}