import jwt from "jsonwebtoken";

export default function DecodeJwt(token:string): any {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
}