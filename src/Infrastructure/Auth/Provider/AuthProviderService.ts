import {ITokenAuthService} from "../../../Domain/Interfaces/Services/ITokenAuthService";
import {IToken} from "../../../Domain/ValueObjects/IToken";
import {INTERFACES} from "../../DI/interfaces.types";
import {inject, injectable} from "inversify";
import {ITokenAuthRepository} from "../../../Domain/Interfaces/Repositories/ITokenAuthRepository";
import UnauthorizedException from "../../../Presentation/Http/Exceptions/UnauthorizedException";

@injectable()
class AuthProviderService implements ITokenAuthService{
    private repository: ITokenAuthRepository;

    public constructor(@inject(INTERFACES.ITokenAuthRepository) repository: ITokenAuthRepository) {
        this.repository = repository;
    }

    public async findOneByHashOrFail(hash: string): Promise<IToken> {
        const token = await this.repository.findOneByHash(hash);

        if (!token){
            throw new UnauthorizedException('Token not valid or expired');
        }

        return token;
    }
}

export default AuthProviderService;