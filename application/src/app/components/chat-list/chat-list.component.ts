import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from "../../models/chat-message.model";
import { Ng2SignalRClientService, ConnectionOptions } from "../../services/ng2-signalr-client/ng2-signalr-client.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
  providers: [Ng2SignalRClientService]
})
export class ChatListComponent implements OnInit {

  public chatMessages: ChatMessage[] = [];
  public userName: string = '';
  public content: string = '';
  public errorMessage: string = null;
  
  constructor(private signalRService: Ng2SignalRClientService) {
    const options = new ConnectionOptions();
    options.url = signalRService.tempurl;
    options.hubName = signalRService.temphubName;
    
    this.signalRService.connect(options)
      .subscribe(data => {
        console.log('in component');
        console.log(data);
        
      })

  }

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

    this.signalRService.invoke('Chat', newMessage);

    this.chatMessages.push(newMessage);
    
  }
}
