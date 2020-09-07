import {IToken} from "../../ValueObjects/IToken";

export interface ITokenAuthRepository {
    findOneByHash(hash: string): Promise<IToken>;
    persist(token: IToken): Promise<void>;
    remove(token: IToken): Promise<void>;
}