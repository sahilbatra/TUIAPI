import { baseError } from "./baseError";
import { errorStatusCode } from "./errorStatusCode";

export class internalServer  extends baseError{
    statusCode:errorStatusCode;
    constructor(statusCode:errorStatusCode,message:string)
    {
        super(statusCode,message);
    }
}