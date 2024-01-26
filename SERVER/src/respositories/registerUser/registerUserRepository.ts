import { message } from "../../controllers/protocols";
import { IRegisterUserRepository, RegisterUserParams } from "../../controllers/registerUserController/protocols";
import * as User from "../../models/User";
import prisma from "../../services/prisma";

export class RegisterUserRepository implements IRegisterUserRepository {
  async register(params: RegisterUserParams): Promise<User.User | message> {
    try {
      const { email } = params;

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return{message: "Usuário já existe com este e-mail."};
      }
      const user = await prisma.user.create({
        data: { ...params },
      });
      if (user) {
        return user;
      }
    } catch (error) {
      return error;
    }
  }
}
