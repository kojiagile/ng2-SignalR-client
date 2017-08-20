import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from "../../models/chat-message.model";
import { Ng2SignalRClientService, ConnectionOptions } from "../../services/ng2-signalr-client/ng2-signalr-client.service";
import { SerializationHelper } from "../../models/serialization-helper";

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
    const self = this;

    this.signalRService.connect(options)
      .subscribe(connection => {
        signalRService.listen("onMessageSent")
          .subscribe( (data: ChatMessage) => {
            console.log(data);
            // data.dump();
            // const msg: ChatMessage = ChatMessage.fromJson(data);
            const msg: ChatMessage = SerializationHelper.createInstance(new ChatMessage(), data);
            
            // TODO: fix bug
            // msg does not appear immediately because this thread is not the main (or UI) thread.
            // To render data, UI thread has to be used.
            this.chatMessages.push(msg);
          });
      });

    // this.signalRService.connect(options)
    //   .subscribe(connection => {
    //     console.log('in component');
    //     console.log(connection);

    //     signalRService.listen("onMessageSent", (name: string, message: string) => {
    //       console.log('in listen callback')
    //       // console.log(name, message)

    //       const newMessage = new ChatMessage();
    //       newMessage.user = name;
    //       newMessage.content = message
    //       // Somehow chatMessages.length - 1 appear in the page. the first received message won't appear...
    //       // Updated: actually all values in the array appear but it's super slow... why is that?
    //       this.chatMessages.push(newMessage);          
    //     });
    //   });


  }

  ngOnInit() {
    this.initialise();
  }

  private initialise() {
    const msg = new ChatMessage();
    msg.name = 'Author';
    msg.message = 'Let\'s chat here!';
    this.chatMessages.push(msg);
  }

  public send() {
    this.errorMessage = null;
    
    if (this.content === null || this.content === '' || this.userName === null || this.userName === '') {
      this.errorMessage = 'User name and message must not be empty.';
      return;
    }
    
    // invoke method returns Observable object 
    // in case you want to receive a response from the method you call.
    // this.signalRService.invoke('Chat', newMessage);
    this.signalRService.invoke('Send', this.userName, this.content)
      .subscribe(data => {
        console.log(data);
      })
    
  }
}
