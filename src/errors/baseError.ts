import { errorStatusCode } from "./errorStatusCode";

export class baseError extends Error
{
    statusCode:errorStatusCode;
 
    constructor(statusCode:errorStatusCode,message:string)
    {
        super(message);
        this.statusCode=statusCode;
      
    }
}