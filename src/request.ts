import { IncomingMessage } from "http";
import { stringify } from "querystring";
import * as https from "https";
let _request = https.request;

export async function request(hostname: string, path: string, headers: {[key: string]: string} = {}, method: string = "GET", data: any = null){
    let options = {
        method,
        hostname,
        path,
        headers
    };
    if(data){
        options.headers["Content-Type"] = "application/x-www-form-urlencoded";
        options.headers["Content-Length"] = Buffer.byteLength(stringify(data)).toString();
    }
    return new Promise(function(resolve: (value?: unknown) => unknown, reject: (value?: unknown) => void){
        let requested = _request(options, function(res: IncomingMessage){
            res.setEncoding("utf-8");
            res.on("data", function(data: any){
                resolve(data);
            });
            requested.on("error", function(){
                reject();
            });
            if(data){
                requested.write(stringify(data));
            }
        });
        requested.end();
    });
}