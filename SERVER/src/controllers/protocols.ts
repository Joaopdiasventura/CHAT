export interface HttpResponse <T>{
    statusCode:number;
    body: T | object;
}

export interface HttpRequest <T>{
    params?: T;
    body?: T;
}

export interface IController {
    handle(request?: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface message {
    message?: string;
}