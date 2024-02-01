import { createServer } from 'http';
import express from 'express';
import { Server as SocketIOServer, Socket } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const userEmailToSocketId = new Map<string, string>();

export function initializeSocket(): void {
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

  app.get('/userEmailToSocketId', (req, res) => {
    const userEmailToSocketIdArray = Array.from(userEmailToSocketId.entries());
    res.json(userEmailToSocketIdArray);
  });

  const port = parseInt(process.env.PORT) || 3000;
  server.listen(port, '0.0.0.0', () => {
    console.log(`Socket.IO server listening on port ${port}`);
  });
}

export { io, userEmailToSocketId };