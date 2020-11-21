import {TokenAuthService} from "../../../Domain/Interfaces/Services/ITokenAuthService";
import {IToken} from "../../../Domain/ValueObjects/IToken";
import {INTERFACES} from "../../DI/interfaces.types";
import {inject, injectable} from "inversify";
import {TokenAuthRepository} from "../../../Domain/Interfaces/Repositories/ITokenAuthRepository";
import UnauthorizedException from "../../../Presentation/Http/Exceptions/UnauthorizedException";
import User from "../../../Domain/Entities/User";
import Token from "../Token";
import crypto from 'crypto';

@injectable()
class AuthProviderService implements TokenAuthService{
    private repository: TokenAuthRepository;

    public constructor(@inject(INTERFACES.ITokenAuthRepository) repository: TokenAuthRepository) {
        this.repository = repository;
    }

    public async findOneByHashOrFail(hash: string): Promise<IToken> {
        const token = await this.repository.findOneByHash(hash);

        if (!token){
            throw new UnauthorizedException('Token not valid or expired');
        }

        return token;
    }

    public async create(user: User): Promise<IToken> {
        const hash = crypto.createHash('sha1').digest('hex');

        const token = new Token(hash, user);

        await this.repository.persist(token);

        return token;
    }
}

export default AuthProviderService;