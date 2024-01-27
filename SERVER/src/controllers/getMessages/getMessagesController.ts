import Message from "../../models/Message";
import { HttpRequest, HttpResponse, IController, message } from "../protocols";
import { GetMessagesParams, IGetMessagesRepository } from "./protocols";

export default class GetMessagesController implements IController {
    constructor(private readonly getMessagesRepository: IGetMessagesRepository){}
    async handle(request?: HttpRequest<GetMessagesParams>): Promise<HttpResponse<Message[] | message>> {
        const {params} = request;

        try {

            const result = await this.getMessagesRepository.getMessages(params);

            if ("message" in result) {
                return{
                    statusCode: 400,
                    body: result
                }
            }

            return{
                statusCode: 200,
                body: result
            }
            
        } catch (error) {
            return{
                statusCode: 500,
                body: error
            }
        }
    }
}