import {IToken} from "../../../../Domain/ValueObjects/IToken";
import User from "../../../../Domain/Entities/User";

class LoginResult {
  private token: IToken;
  private user: User;
  public constructor(token: IToken, user: User) {
    this.token = token;
    this.user = user;
  }

  public getToken(): IToken {
    return this.token;
  }

  public getUser(): User {
    return this.user;
  }
}

export default LoginResult;