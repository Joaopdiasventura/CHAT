import { config } from 'dotenv';

config();

import fastify from 'fastify';
import user from './routes/user';
import startServer from './server';
import cors from "@fastify/cors";

const app = fastify();

const corsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.register(cors, corsOptions);

app.register(user);

startServer(app);