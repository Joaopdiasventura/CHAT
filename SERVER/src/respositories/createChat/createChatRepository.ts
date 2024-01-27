import { CreateChatParams, ICreateChatRepository } from "../../controllers/createChat/portocols";
import { message } from "../../controllers/protocols";
import Chat from "../../models/Chat";
import prisma from "../../services/prisma";

export class CreateChatRepository implements ICreateChatRepository{
    async createChat(params: CreateChatParams): Promise<message | Chat> {
        if (params.user == params.user_) {
            return{
                message: "Não é possivel criar uma conversa consigo mesmo"
            }
        }
        try {
            const existChat = await prisma.chat.findFirst({
                where:{...params}
            });
            
            if (existChat) {
                return{
                    message: "Já existe uma conversa entre você e o usuario digitado"
                }
            }
            const user = await prisma.user.findFirst({
                where: {
                    email: params.user
                }
            });
            const user_ = await prisma.user.findFirst({
                where: {
                    email: params.user_
                }
            });
            if (!user || !user_) {
                return{
                    message: "Usuário não encontrado"
                }
            }
            const chat = prisma.chat.create({
                data:{...params}
            });
            return chat;
        } catch (error) {
            return error;
        }
    }
}