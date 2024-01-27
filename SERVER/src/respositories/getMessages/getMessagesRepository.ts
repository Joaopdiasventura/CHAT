import { GetMessagesParams, IGetMessagesRepository } from "../../controllers/getMessages/protocols";
import { message } from "../../controllers/protocols";
import Message from "../../models/Message";
import prisma from "../../services/prisma";

export class GetMessagesRepository implements IGetMessagesRepository{
    async getMessages(params: GetMessagesParams): Promise<Message[] | message> {
        try {
            const chat = await prisma.chat.findFirst({
                where: {id: params.chat}
            });
            if (!chat) {
                return{message: "O chat solicitado não existe"}
            }
            const messages = await prisma.message.findMany({
                where: {chat: params.chat}
            });
            return messages;
        } catch (error) {
            return error
        }
    }
}