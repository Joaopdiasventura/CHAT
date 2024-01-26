import fastify from 'fastify';
import { Server as SocketIOServer } from 'socket.io';
import { AddressInfo } from 'net';

export default async function startServer(app: any) {
    try {
  
      await app.listen({port: parseInt(process.env.PORT) || 3001});
  
      const addressInfo = app.server.address();
      const port = typeof addressInfo === 'string' ? addressInfo : (addressInfo as AddressInfo).port;
      console.log(`Server listening on port ${port}`);
  
      const io = new SocketIOServer(app.server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
      });
  
      io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.emit('message', 'Hello from server!');
  
        socket.on('clientMessage', (message) => {
          console.log('Received message from client:', message);
        });
  
        socket.on('disconnect', () => {
          console.log('Client disconnected:', socket.id);
        });
      });
  
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }