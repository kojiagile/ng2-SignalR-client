import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from "../../models/chat-message.model";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  public chatMessages: ChatMessage[] = [];
  public userName: string = '';
  public content: string = '';
  public errorMessage: string = null;
  constructor() { }

  ngOnInit() {
    this.initialise();
  }

  private initialise() {
    const msg = new ChatMessage();
    msg.user = 'Author';
    msg.content = 'Let\'s chat here!';
    this.chatMessages.push(msg);
  }
  public onKey(event: any) {
    this.content = event.target.value;
  }

  public send() {
    this.errorMessage = null;
    
    if (this.content === null || this.content === '' || this.userName === null || this.userName === '') {
      this.errorMessage = 'User name and message must not be empty.';
      return;
    }
    console.log(this.content);
    const newMessage = new ChatMessage();
    newMessage.user = this.userName;
    newMessage.content = this.content;
    this.chatMessages.push(newMessage);
  }
}
