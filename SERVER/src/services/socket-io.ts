import { createServer } from 'http';
import { Server } from 'socket.io';

let io: Server;
const userEmailToSocketId = new Map<string, string>();

export function initializeSocket(): void {
  const server = createServer();
  io = new Server(server, {
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

  const port = 3000;
  server.listen(port, () => {
    console.log(`Socket.IO server listening on port ${port}`);
  });
}

export { io, userEmailToSocketId };