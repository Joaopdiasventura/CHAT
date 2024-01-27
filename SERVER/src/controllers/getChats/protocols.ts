import Chat from "../../models/Chat";
import { message } from "../protocols";

export interface GetChatsParams {
    user: string
}

export interface IGetChatsRepository {
    getChats(params: GetChatsParams): Promise<Chat[] | message>;
}