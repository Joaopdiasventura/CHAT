import { FastifyInstance } from "fastify";
import { CreateChatParams } from "../controllers/createChat/portocols";
import { CreateChatRepository } from "../respositories/createChat/createChatRepository";
import { CreateChatController } from "../controllers/createChat/createChatController";
import { GetChatsParams } from "../controllers/getChats/protocols";
import { GetChatsRepository } from "../respositories/getChats/getChatsRepository";
import { GetChatsController } from "../controllers/getChats/getChatsController";

export default async function (app: FastifyInstance) {
    app.post("/chat",async (request, reply) => {
        const Body = request.body as CreateChatParams;

        const createChatRepository = new CreateChatRepository();
        const createChatController = new CreateChatController(createChatRepository);

        try {
            const {body, statusCode} = await createChatController.handle({
                body: Body
            });
            return reply.code(statusCode).send(body);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    app.get("/chat/:user", async (request, reply) => {
        const Params = request.params as GetChatsParams;

        const getChatsRepository = new GetChatsRepository();
        const getChatsController = new GetChatsController(getChatsRepository);
        
        try {
            const {body, statusCode} = await getChatsController.handle({
                params: Params
            });
            return reply.code(statusCode).send(body);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

}