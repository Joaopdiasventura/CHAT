import { FastifyInstance } from 'fastify';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;
const userEmailToSocketId = new Map<string, string>();

export function initializeSocket(fastify: FastifyInstance): void {
  const httpServer = fastify.server;

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: 'https://chat-two-ochre-97.vercel.app',
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
