import Message from "../../models/Message";
import { message } from "../protocols";

export interface SendMessageParams {
    user: string;
    chat: string;
    content: string;
}

export interface ISendMessagerepository {
    sendMessage(params: SendMessageParams): Promise<Message[] | message>;
}