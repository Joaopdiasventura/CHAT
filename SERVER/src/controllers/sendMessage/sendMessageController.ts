import Message from "../../models/Message";
import { HttpRequest, HttpResponse, IController, message } from "../protocols";
import { ISendMessagerepository, SendMessageParams } from "./protocols";

export class SendMessageController implements IController{
    constructor(private readonly sendMessageRepository: ISendMessagerepository){}
    async handle(request?: HttpRequest<SendMessageParams>): Promise<HttpResponse<Message[] | message>> {
        const {body} = request;
        try {
            
            const result = await this.sendMessageRepository.sendMessage(body);

            if ("message" in result) {
                return{
                    statusCode: 400,
                    body: result
                }
            }

            return {
                statusCode: 201,
                body: result
            }

        } catch (error) {
            return {
                statusCode: 500,
                body
            }
        }
    }

}