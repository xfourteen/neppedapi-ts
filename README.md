## neppedapi-ts - враппер API NeppedCord для TypeScript.
## Установка:
```bash
npm install --save github:xfourteen/neppedapi-ts
```
## Пример использования:
```typescript
import { APIClient, SharpClient } from "neppedapi_ts";
let client: APIClient = new APIClient("token");
// ^ Конструктор класса APIClient принимает только параметр token типа string.
// Получить его можно тут -> https://api-docs.neppedcord.top/start/auth.
let sclient: SharpClient = client.getSharp();
// ^ Документация к Sharp тут -> https://api-docs.neppedcord.top/api/sharp.
// Интерфейсы ответов API-сервера находятся в файле src/interfaces.ts.
(async function(){
    try {
        let response = await client.getImage("hug");
        // ^ доступны типы "baka", "cry", "cuddle", "happy", "hug", "kiss", "sad", "wag", "pat", "poke", "dance", "smug".
        console.log(response.url); // response: IImageResponse.
        let ban_instance = await sclient.getUser("777259798470459403"); // response: ISharpBan
        await sclient.banUser("777259798470459403");
        await sclient.unbanUser("777259798470459403");
    }catch(e){
        console.log(e);
    }
})();
```
