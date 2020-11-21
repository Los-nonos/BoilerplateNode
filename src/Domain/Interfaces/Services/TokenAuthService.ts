import {IToken} from "../../ValueObjects/IToken";
import User from "../../Entities/User";

export interface TokenAuthService {
  findOneByHashOrFail(hash: string): Promise<IToken>;

  create(user: User): Promise<IToken>;
}