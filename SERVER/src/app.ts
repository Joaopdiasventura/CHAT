import { config } from 'dotenv';

config();

import fastify from 'fastify';
import cors from "@fastify/cors";
import startServer from './server';
import user from "./routes/user";
import chat from "./routes/chat";
import message from './routes/message';

const app = fastify();

const corsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.register(cors, corsOptions);

app.register(user);
app.register(chat);
app.register(message);

startServer(app);