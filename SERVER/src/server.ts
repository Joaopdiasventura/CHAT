import { FastifyInstance } from "fastify";
import { initializeSocket } from './services/socket-io';
import { AddressInfo } from 'net';

export default async function startServer(app: FastifyInstance) {
    try {
  
      await app.listen({port: parseInt(process.env.PORT) || 3001});

      const userSockets = new Map<string, string>();
  
      const addressInfo = app.server.address();
      const port = typeof addressInfo === 'string' ? addressInfo : (addressInfo as AddressInfo).port;
      console.log(`Server listening on port ${port}`);
  
      initializeSocket(app.server);
  
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }