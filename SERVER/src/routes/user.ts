import axios from "axios";
import { FastifyInstance } from "fastify";
import { LoginUserController } from "../controllers/loginUserController/loginUserController";
import { LoginUserParams } from "../controllers/loginUserController/protocols";
import { RegisterUserParams } from "../controllers/registerUserController/protocols";
import { RegisterUserController } from "../controllers/registerUserController/registerUserController";
import { LoginUserRepository } from "../respositories/loginUser/loginUserRepository";
import { RegisterUserRepository } from "../respositories/registerUser/registerUserRepository";
import prisma from "../services/prisma";
import { GetChatsParams } from "../controllers/getChats/protocols";

export default async function (app: FastifyInstance) {

  const Axios = axios.create({
    baseURL: "https://email-4ocx.onrender.com",
  });

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

  app.get("/email/:user", async (request, reply) => {
    try {
      const Params = request.params as GetChatsParams;
      const cod = (Math.random() * 999).toFixed(0);
      
      try {
        await Axios.post("/", {
          from: process.env.EMAIL,
          password: process.env.PASSWORD,
          to: Params.user,
          title: "CÓDIGO DE VERIFICAÇÃO DO TWITTER",
          content: cod,
        });
        reply.status(200).send(cod);
      } catch (error) {
        reply.send(error);
      }

    } catch (error) {
      reply.send("Erro ao enviar o email: " + error);
    }
  });
}
