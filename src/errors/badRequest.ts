import { baseError } from "./baseError";

export class badRequest extends baseError
{
    constructor(statusCode:number,message:string)
    {
        super(statusCode,message);
    }
}