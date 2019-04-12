import { Component, OnInit } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from './../shared/services/socketio-adapter'
import { Socket } from 'ng-socket-io';
import { Http } from '@angular/http';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  title = 'Welcome to the chat';
  
  userId: string;
  username: string;

  public adapter: ChatAdapter;

  constructor(private auth: AuthService,
              private userService: UserService,
              private socket: Socket, private http: Http) {
       
    this.username = auth.currentUser.username;
    this.InitializeSocketListerners(); 
    this.joinRoom(); 
  }

  public joinRoom(): void 
  {
    this.socket.emit("join", this.username);
  }

  public InitializeSocketListerners(): void
  {
    this.socket.on("generatedUserId", (userId) => {
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
      this.userId = userId;
    });
  }
}