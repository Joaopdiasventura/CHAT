import { User } from "../../models/User";
import { message } from "../protocols";

export interface RegisterUserParams {
    email: string;
    name: string;
    password: string;
}

export interface IRegisterUserRepository{
    register(params: RegisterUserParams): Promise<User | message>; 
}