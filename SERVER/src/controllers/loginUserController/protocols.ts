import { User } from "../../models/User";
import { message } from "../protocols";

export interface LoginUserParams {
    email: string;
    password: string;
}

export interface ILoginUserRepository {
    login(params: LoginUserParams):Promise<User | message>;
}