import { FastifyInstance } from "fastify";
import { GetMessagesParams } from "../controllers/getMessages/protocols";
import { GetMessagesRepository } from "../respositories/getMessages/getMessagesRepository";
import GetMessagesController from "../controllers/getMessages/getMessagesController";
import { SendMessageParams } from "../controllers/sendMessage/protocols";
import { SendMessageRepository } from "../respositories/sendMessage/sendMessageRepository";
import { SendMessageController } from "../controllers/sendMessage/sendMessageController";
import { io, userEmailToSocketId } from "../services/socket-io";


export default async function (app: FastifyInstance) {

    app.get("/message/:chat",async (request, reply) => {
        const Params = request.params as GetMessagesParams;

        const getMessagesRepository = new GetMessagesRepository();
        const getMessagesController = new GetMessagesController(getMessagesRepository);

        try {
            
            const {body, statusCode} = await getMessagesController.handle({
                params : Params
            });

            return reply.code(statusCode).send(body);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    app.post("/message", async (request, reply) => {
        const Body = request.body as SendMessageParams;

        const sendMessageRepository = new SendMessageRepository(io, userEmailToSocketId);
        const sendMessageController = new SendMessageController(sendMessageRepository);

        try {
            
            const {body, statusCode} = await sendMessageController.handle({
                body: Body
            });

            return reply.code(statusCode).send(body);
        } catch (error) {
            reply.status(500).send(error);
        }

    })

}