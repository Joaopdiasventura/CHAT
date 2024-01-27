import { ILoginUserRepository, LoginUserParams } from "../../controllers/loginUserController/protocols";
import { message } from "../../controllers/protocols";
import { User } from "../../models/User";
import prisma from "../../services/prisma";

export class LoginUserRepository implements ILoginUserRepository{
    async login(params: LoginUserParams): Promise<User | message> {
        try {
            const user = await prisma.user.findUnique({
                where: {email: params.email}
            });

            if (!user) {
                return {message: "Esse email não está registrado"};
            }

            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
}