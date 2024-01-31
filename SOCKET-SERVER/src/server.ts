import { createServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

let io: SocketIOServer;
const userEmailToSocketId = new Map<string, string>();

export function initializeSocket(): void {
  const server = createServer();
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    socket.on('registerEmail', (email) => {
      userEmailToSocketId.set(email, socket.id);
      console.log(userEmailToSocketId.get(email));
    });

    socket.on('disconnect', () => {
      for (const [email, socketId] of userEmailToSocketId.entries()) {
        if (socketId === socket.id) {
          userEmailToSocketId.delete(email);
          break;
        }
      }
    });

    socket.on('newMessage', (result) => {
        console.log(result);
        io.to(result.to).emit('newMessage', result.data);
      });
  });

  server.on('request', (req, res) => {
    if (req.url === '/userEmailToSocketId') {
      const userEmailToSocketIdArray = Array.from(userEmailToSocketId.entries());
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(userEmailToSocketIdArray));
    }
  });

  const port = 3000;
  server.listen(port, '0.0.0.0', () => {
    console.log(`Socket.IO server listening on port ${port}`);
  });
}

export { io, userEmailToSocketId };
