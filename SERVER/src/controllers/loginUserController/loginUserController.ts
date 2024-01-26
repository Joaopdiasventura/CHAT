import CreateJwt from "../jsonwebtoken/createJwt";
import bcrypt from "bcrypt";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { ILoginUserRepository, LoginUserParams } from "./protocols";

export class LoginUserController implements IController{
    constructor(private readonly loginUserRepository: ILoginUserRepository){}
    async handle(request?: HttpRequest<LoginUserParams>): Promise<HttpResponse<string>> {
        const {body} = request;
        try {
            const result = await this.loginUserRepository.login(body);
            
            if ('email' in result) {
                const passwordConfirm = bcrypt.compare(body.password, result.password)

                if (!passwordConfirm) {
                  return {
                    statusCode: 400,
                    body: {mensage: "Senha incorreta"}
                  }
                }
                return {
                    statusCode: 201,
                    body: CreateJwt(result.email)
                };
            }
            else{
                return {
                    statusCode: 400,
                    body: result.message
                };
            }
        } catch (error) {
            
        }
    }
}