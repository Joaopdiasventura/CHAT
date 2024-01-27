import { Server as SocketIOServer } from 'socket.io';
import { message } from "../../controllers/protocols";
import { ISendMessagerepository, SendMessageParams } from "../../controllers/sendMessage/protocols";
import Message from "../../models/Message";
import prisma from "../../services/prisma";

export class SendMessageRepository implements ISendMessagerepository{    
    private io: SocketIOServer;
    private userEmailToSocketId: Map<string, string>; // Mapa de email para socket ID

    constructor(io: SocketIOServer, userEmailToSocketId: Map<string, string>) {
        this.io = io;
        this.userEmailToSocketId = userEmailToSocketId;
    }

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

            const {name} = await prisma.user.findFirst({where: {email: params.user}});

            const msg = await prisma.message.create({
                data:{...params}
            });

            const updatedMessages = await prisma.message.findMany({
                where: { chat: params.chat }
            });

            let recipientEmail: string;


            if (chat.user == params.user) {
                recipientEmail = chat.user_;
            }
            else{
                recipientEmail = chat.user;
            }

    
    
                const socketId = this.userEmailToSocketId.get(recipientEmail);
                if (socketId) {
                    const content = msg.content;
                    this.io.to(socketId).emit('newMessage', {name, content});
                }
    
            return updatedMessages;
            
        } catch (error) {
            return error;
        }
    }
}