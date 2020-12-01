import BaseHttpException from "./BaseHttpException";
import {HTTP_CODES} from "../Enums/HttpCodes";

class Forbidden extends BaseHttpException {
    constructor(message: string) {
        super(Forbidden.name, message, HTTP_CODES.FORBIDDEN, '', '');

    }

}

export default Forbidden;