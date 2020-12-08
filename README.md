## neppedapi-ts - враппер API NeppedCord для TypeScript.
## Установка:
```bash
npm install --save github:xfourteen/neppedapi-ts
```
## Пример использования:
```typescript
import { APIClient } from "neppedapi_ts";
let client: APIClient = new APIClient("token");
// ^ Конструктор класса APIClient принимает только параметр token типа string.
// Получить его можно тут -> https://api-docs.neppedcord.top/start/auth.
(async function(){
    try {
        let response = await client.getImage("hug");
        // ^ доступны типы "baka", "cry", "cuddle", "happy", "hug", "kiss", "sad", "wag".
        console.log(response.url); // response: IImageResponse = {url: string}.
    }catch(e){
        console.log(e);
    }
})();
```
