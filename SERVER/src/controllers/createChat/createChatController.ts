import { Chat } from "@prisma/client";
import { HttpRequest, HttpResponse, IController, message } from "../protocols";
import { CreateChatParams, ICreateChatRepository } from "./portocols";

export class CreateChatController implements IController {
    constructor(private readonly createChatRepository: ICreateChatRepository){}
    async handle(request?: HttpRequest<CreateChatParams>): Promise<HttpResponse<Chat | message>> {
        const {body} = request;
        try {
            const result = await this.createChatRepository.createChat(body);
            
            if ('message' in result) {
                return {
                    statusCode: 400,
                    body: result
                };
            }
            else{
                return {
                    statusCode: 201,
                    body: result
                };
            }
        } catch (error) {
            return{
                statusCode: 500,
                body: error
            }
        }
    }

}