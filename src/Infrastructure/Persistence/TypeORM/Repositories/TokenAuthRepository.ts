import {ITokenAuthRepository} from "../../../../Domain/Interfaces/Repositories/ITokenAuthRepository";
import TypeRepository from "./TypeRepository";
import {IToken} from "../../../../Domain/ValueObjects/IToken";
import Token from "../../../Auth/Token";

class TokenAuthRepository extends TypeRepository implements ITokenAuthRepository {
    public async findOneByHash(hash: string): Promise<IToken> {
        return await this.repository(Token).find({hash});
    }

    public async persist(token: IToken): Promise<void> {
        await this.repository(Token).persist(token);
    }

    public async remove(token: IToken): Promise<void> {
        return await this.repository(Token).delete(token);
    }

}

export default TokenAuthRepository;