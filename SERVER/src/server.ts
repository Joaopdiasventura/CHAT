// server.ts
import { FastifyInstance } from 'fastify';
import { AddressInfo } from 'net';

export default async function startServer(app: FastifyInstance) {
  try {
    const port = parseInt(process.env.PORT);
    await app.listen({ port });

    const addressInfo = app.server.address() as AddressInfo;
    const actualPort = addressInfo.port;

    console.log(`Server listening on port ${actualPort}`);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}