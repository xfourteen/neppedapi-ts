import { IImageResponse, ISharpBan } from "./interfaces";
import { request } from "./request";

export class SharpClient {
    token: string;
    constructor(token: string){
        this.token = token;
    }
    async getUser(id: string | null): Promise<ISharpBan>{
        if(id == null)throw new ReferenceError("[neppedapi-ts] Айди пользователя не указан.");
        let data: string = <string>(await request("neppedcord.top", `/api/sharp/user/${id}`, {
            Authorization: this.token
        }));
        let response: any = JSON.parse(data);
        if(response.error){
            if(response.error.code == 401){
                throw new Error("[neppedapi-ts] Неверный токен.");
            }else if(response.error.code == 404){
                throw new Error("[neppedapi-ts] Для этого айди не найдена запись в датабазе.");
            }else{
                throw new Error(`[neppedapi-ts] Ошибка в запросе. Ответ сервера: ${response.error.message}`);
            }
        }
        return <ISharpBan>response;
    }
    async banUser(id: string | null, data?: {image?: string, reason?: string}): Promise<boolean>{
        if(id == null)throw new ReferenceError("[neppedapi-ts] Айди пользователя не указан.");
        let rdata: string = <string>(await request("neppedcord.top", `/api/sharp/user/${id}`, {
            Authorization: this.token
        }, "POST", data));
        let response: any = JSON.parse(rdata);
        if(response.error){
            if(response.error.code == 401){
                throw new Error("[neppedapi-ts] Неверный токен.");
            }else if(response.error.code == 403){
                throw new Error("[neppedapi-ts] У вас нет прав для выполнения этого действия.");
            }else if(response.error.code == 422){
                throw new Error("[neppedapi-ts] Пользователь с данным ID уже забанен.");
            }else{
                throw new Error(`[neppedapi-ts] Ошибка в запросе. Ответ сервера: ${response.error.message}`);
            }
        }
        return true;
    }
    async unbanUser(id: string | null): Promise<boolean> {
        if(id == null)throw new ReferenceError("[neppedapi-ts] Айди пользователя не указан.");
        let data: string = <string>(await request("neppedcord.top", `/api/sharp/user/${id}/unban`, {
            Authorization: this.token
        }, "DELETE"));
        let response: any = JSON.parse(data);
        if(response.error){
            if(response.error.code == 401){
                throw new Error("[neppedapi-ts] Неверный токен.");
            }else if(response.error.code == 404){
                throw new Error("[neppedapi-ts] Для этого айди не найдена запись в датабазе.");
            }else if(response.error.code == 403){
                throw new Error("[neppedapi-ts] У вас нет прав для выполнения этого действия.");
            }else{
                throw new Error(`[neppedapi-ts] Ошибка в запросе. Ответ сервера: ${response.error.message}`);
            }
        }
        return true;
    }
}

export class APIClient {
    token: string;
    hostname: string = "neppedcord.top";
    imageTypes: string[] = ["baka", "cry", "cuddle", "happy", "hug", "kiss", "sad", "wag", "pat", "poke", "dance", "smug"];
    constructor(token: string | null){
        if(token == null){
            throw new ReferenceError("[neppedapi-ts] Токен авторизации не указан.");
        }else{
            this.token = <string>token;
        }
    }
    async getImage(type: string | null): Promise<IImageResponse> {
        if(type == null)throw new TypeError(`[neppedapi-ts] Тип изображения не указан. На данный момент доступны ${this.imageTypes.join(", ")}.`);
        if(!this.imageTypes.includes(type))throw new TypeError(`[neppedapi-ts] Неверный тип изображения. На данный момент доступны ${this.imageTypes.join(", ")}.`);
        let data: string = <string>(await request("neppedcord.top", `/api/images/${type}`, {
            Authorization: this.token
        }));
        let response: any = JSON.parse(data);
        if(response.error){
            if(response.error.code == 401){
                throw new Error("[neppedcord-ts] Неверный токен.");
            }else{
                throw new Error(`[neppedcord-ts] Ошибка в запросе. Ответ сервера: ${response.error.message}`);
            }
        }
        return <IImageResponse>response;
    }
    getSharp(){
        return new SharpClient(this.token);
    }
}
