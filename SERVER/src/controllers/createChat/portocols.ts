import Chat from "../../models/Chat";
import { message } from "../protocols";

export interface CreateChatParams {
    user: string;
    user_: string
}

export interface ICreateChatRepository{
    createChat(param: CreateChatParams): Promise<Chat | message>;
}