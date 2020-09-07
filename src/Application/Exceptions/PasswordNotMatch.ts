import ApplicationError from "./ApplicationError";

class PasswordNotMatch extends ApplicationError {
    public constructor(message: string = 'Password don\'t match') {
        super('password', message);
    }
}

export default PasswordNotMatch;