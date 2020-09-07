import BaseHttpException from "./BaseHttpException";
import {HTTP_CODES} from "../Enums/HttpCodes";

class UnauthorizedException extends BaseHttpException {
    public constructor(message: string) {
        super(UnauthorizedException.name, message, HTTP_CODES.UNAUTHORIZED, '', '');
    }
}

export default UnauthorizedException;