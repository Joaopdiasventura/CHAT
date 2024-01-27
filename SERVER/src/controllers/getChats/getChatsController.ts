import { HttpRequest, HttpResponse, IController, message } from "../protocols";
import { GetChatsParams, IGetChatsRepository } from "./protocols";
import Chat from "../../models/Chat";

export class GetChatsController implements IController{
    constructor(private readonly getChatsRepository: IGetChatsRepository){}
    async handle(request?: HttpRequest<GetChatsParams>): Promise<HttpResponse<Chat[] | message>> {
        const {params} = request;
        try {

            const result = await this.getChatsRepository.getChats(params);

            if ("message" in result) {
                return{
                    statusCode: 400,
                    body: result
                }
            }

            return {
                statusCode: 200,
                body: result
            };
            
        } catch (error) {
            return{
                statusCode: 500,
                body: error
            }
        }
    }

}