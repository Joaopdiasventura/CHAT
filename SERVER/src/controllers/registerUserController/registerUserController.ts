import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IRegisterUserRepository, RegisterUserParams } from "./protocols";
import bcrypt from "bcrypt";
import CreateJwt from "../jsonwebtoken/createJwt";

export class RegisterUserController implements IController{
    constructor(private readonly registerUserRepository: IRegisterUserRepository){}

    async handle(request?: HttpRequest<RegisterUserParams>): Promise<HttpResponse<string>> {
        const {body} = request;

        const hash = 10;
        body.password = await bcrypt.hash(body.password, hash);

        try {
            const result = await this.registerUserRepository.register(body);
            
            if ('email' in result) {
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
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}
