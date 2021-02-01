import { badRequest } from "./badRequest";
import { baseError } from "./baseError";
import { errorStatusCode } from "./errorStatusCode";
import { internalServer } from "./internalServer";
import { invalidAcceptHeader } from "./invalidAcceptHeader";
import { notFound } from "./notFound";

export class errorManager {

    async throw(error: any) {
        const statusCode = error.response?.status || error.request?.status || error.status;
        const message = error.response?.statusText || error.request?.statusText || error.statusText;

        const baseErrorObj = new baseError(statusCode, message);
        switch (baseErrorObj.statusCode) {
            case errorStatusCode.BadRequest:
                {
                    throw new badRequest(baseErrorObj.statusCode, baseErrorObj.message);
                    break;
                }
            case errorStatusCode.NotFound:
                {
                    throw new notFound(baseErrorObj.statusCode, baseErrorObj.message);
                    break;
                }
            case errorStatusCode.invalidAcceptHeader:
                {
                    throw new invalidAcceptHeader(baseErrorObj.statusCode, baseErrorObj.message);
                    break;
                }
            default:
                {
                    throw new internalServer(errorStatusCode.InternalServerError, error)
                }
        }
    }
}