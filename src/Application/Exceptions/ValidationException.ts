import ApplicationError from "./ApplicationError";

class ValidationException extends ApplicationError {
    public constructor(message: string) {
        super(ValidationException.name, message);
    }
}

export default ValidationException;