import { FastifyInstance } from "fastify";
import { DecodeController } from "../controllers/jsonwebtoken/decodeJwt";
import Token from "../models/Token";

export default async function (app: FastifyInstance) {

    app.get("/decode/:token",async (request, reply) => {
        const Params = request.params as Token;
        const decodeController = new DecodeController();

        try {
            const {body,  statusCode} = await decodeController.handle({
                params: Params
            });
            reply.status(statusCode).send(body);
        } catch (error) {
            reply.status(500).send(error);
        }
    })

}