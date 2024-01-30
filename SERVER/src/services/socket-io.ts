import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: SocketIOServer;
const userEmailToSocketId = new Map<string, string>();

export function initializeSocket(server: HttpServer): void {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('registerEmail', (email) => {
      userEmailToSocketId.set(email, socket.id);
    });

    socket.on('disconnect', () => {
      for (const [email, socketId] of userEmailToSocketId.entries()) {
        if (socketId === socket.id) {
          userEmailToSocketId.delete(email);
          break;
        }
      }
    });
  });
}

export { io, userEmailToSocketId };