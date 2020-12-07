import { IImageResponse } from "./interfaces";
import { request } from "./request";

export class APIClient {
    token: string;
    hostname: string = "neppedcord.top";
    imageTypes: string[] = ["baka", "cry", "cuddle", "happy", "hug", "kiss", "sad", "wag"];
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
}