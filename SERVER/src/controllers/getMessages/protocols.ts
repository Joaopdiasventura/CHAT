import Message from "../../models/Message";
import { message } from "../protocols";

export interface GetMessagesParams {
    chat: string;
}

export interface IGetMessagesRepository {
    getMessages(params: GetMessagesParams): Promise<Message[] | message>;
}