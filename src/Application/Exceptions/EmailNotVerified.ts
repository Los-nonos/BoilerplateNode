import ApplicationError from "./ApplicationError";

class EmailNotVerified extends ApplicationError {
    public constructor(message: string = 'Email not verified, please check your email and verified your account') {
        super('email', message);
    }
}

export default EmailNotVerified;