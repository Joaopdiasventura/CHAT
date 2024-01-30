// server.ts
import { FastifyInstance } from 'fastify';
import { initializeSocket } from './services/socket-io';
import { AddressInfo } from 'net';

export default async function startServer(app: FastifyInstance) {
  try {
    const port = process.env.PORT || 3000; // Use a porta 3000 se PORT não estiver definido.
    await app.listen(port);

    const addressInfo = app.server.address();
    const actualPort =
      typeof addressInfo === 'string'
        ? parseInt(addressInfo.split(':').pop() as string, 10)
        : (addressInfo as AddressInfo).port;

    console.log(`Server listening on port ${actualPort}`);

    initializeSocket(app.server);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
