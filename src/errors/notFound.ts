import { baseError } from "./baseError";

export class notFound extends baseError
{
    constructor(statusCode:number,message:string)
    {
        super(statusCode,message);
    }
}