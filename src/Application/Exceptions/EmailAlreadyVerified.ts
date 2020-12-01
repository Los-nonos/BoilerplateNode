import ApplicationError from "./ApplicationError";

class EmailAlreadyVerified extends ApplicationError {
  constructor(message: string = 'Email is already verified!') {
    super(EmailAlreadyVerified.name, message);
  }
}

export default EmailAlreadyVerified;