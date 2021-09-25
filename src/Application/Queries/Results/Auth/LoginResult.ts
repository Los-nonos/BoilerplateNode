import User from "../../../../Domain/Entities/User";
import { Response } from '../../../../Domain/ValueObjects/Response';

class LoginResult implements Response {
  private token: any;
  private user: User;
  public constructor(token: any, user: User) {
    this.token = token;
    this.user = user;
  }

  public getToken(): any {
    return this.token;
  }

  public getUser(): User {
    return this.user;
  }
}

export default LoginResult;