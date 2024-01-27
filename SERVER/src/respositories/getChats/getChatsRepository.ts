import { GetChatsParams, IGetChatsRepository } from "../../controllers/getChats/protocols";
import { message } from "../../controllers/protocols";
import prisma from "../../services/prisma";
import Chat from "../../models/Chat";

export class GetChatsRepository implements IGetChatsRepository{
    async getChats(params: GetChatsParams): Promise<Chat[] | message> {

        const User = await prisma.user.findUnique({where: {email: params.user}});

        if (!User) {
            return{
                message: "O usuario não está registrado"
            }
        }

        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    { user: params.user },
                    { user_: params.user }
                ]
            }
        });

        for(const chat of chats){
            console.log(chat);
            
            if (chat.user = params.user) {
                const user = await prisma.user.findUnique({where:{email: chat.user_}})
                chat.user_ = user.name;
            }
            else{
                const user = await prisma.user.findUnique({where:{email: chat.user}})
                chat.user = user.name;
            }
        }

        return chats
    }

}