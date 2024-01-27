import { message } from "../../controllers/protocols";
import { ISendMessagerepository, SendMessageParams } from "../../controllers/sendMessage/protocols";
import Message from "../../models/Message";
import prisma from "../../services/prisma";

export class SendMessageRepository implements ISendMessagerepository{
    async sendMessage(params: SendMessageParams): Promise<Message[] | message> {
        try {

            const chat = await prisma.chat.findFirst({
                where: {
                    id: params.chat,
                    OR: [
                        { user: params.user },
                        { user_: params.user }
                    ]
                }
            });
            
            if (!chat) {
                return{
                    message: "Chat não encontrado"
                }
            }

            await prisma.message.create({
                data:{...params}
            });

            return await prisma.message.findMany({
                where: {chat: params.chat}
            });
            
        } catch (error) {
            return error;
        }
    }
}