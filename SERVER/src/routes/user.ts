import { FastifyInstance } from "fastify";
import { LoginUserController } from "../controllers/loginUserController/loginUserController";
import { LoginUserParams } from "../controllers/loginUserController/protocols";
import { RegisterUserParams } from "../controllers/registerUserController/protocols";
import { RegisterUserController } from "../controllers/registerUserController/registerUserController";
import { LoginUserRepository } from "../respositories/loginUser/loginUserRepository";
import { RegisterUserRepository } from "../respositories/registerUser/registerUserRepository";
import prisma from "../services/prisma";

export default async function (app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    reply.send(prisma.user.findMany());
  });

  app.post("/register", async (request, reply) => {
    const Body = request.body as RegisterUserParams;

    const registerUserRepository = new RegisterUserRepository();
    const registerUserController = new RegisterUserController(
      registerUserRepository
    );

    try {
      const { body, statusCode } = await registerUserController.handle({
        body: Body,
      });
  
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });

  app.post("/login",async (request, reply) => {
    const Body = request.body as LoginUserParams;

    const loginUserRepository = new LoginUserRepository();
    const loginUserController = new LoginUserController(loginUserRepository);
    try {
      const {body, statusCode} = await loginUserController.handle({
        body: Body
      });
      reply.status(statusCode).send(body);
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}
