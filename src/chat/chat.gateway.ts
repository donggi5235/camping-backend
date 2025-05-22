import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessageDto } from './chat-message.dto';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: ChatMessageDto): void {
    this.server.emit('message', {
      user: payload.user,
      text: payload.text,
      timestamp: new Date().toISOString()
    });
  }
}