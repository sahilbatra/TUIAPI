import { baseError } from "./baseError";

export class invalidAcceptHeader extends baseError
{
    constructor(statusCode:number,message:string)
    {
        super(statusCode,message);
    }
}