import {IToken} from "../../ValueObjects/IToken";

export interface TokenAuthRepository {
    findOneByHash(hash: string): Promise<IToken>;
    persist(token: IToken): Promise<void>;
    remove(token: IToken): Promise<void>;
}