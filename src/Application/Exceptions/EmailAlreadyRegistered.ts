import ApplicationError from "./ApplicationError";

class EmailAlreadyRegistered extends ApplicationError {
  public constructor(message: string = 'Email not verified, please check your email and verified your account') {
    super('email', message);
  }
}

export default EmailAlreadyRegistered;