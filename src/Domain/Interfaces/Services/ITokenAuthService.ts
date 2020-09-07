import {IToken} from "../../ValueObjects/IToken";

export interface ITokenAuthService {
    findOneByHashOrFail(hash: string): Promise<IToken>;
}