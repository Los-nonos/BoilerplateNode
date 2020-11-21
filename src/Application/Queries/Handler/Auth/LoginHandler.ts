import { inject } from "inversify";
import { INTERFACES } from "../../../../Infrastructure/DI/interfaces.types";
import LoginQuery from "../../Query/Auth/LoginQuery";
import EmailNotVerified from "../../../Exceptions/EmailNotVerified";
import { HashManager } from "../../../../Domain/Interfaces/Services/HashManager";
import PasswordNotMatch from "../../../Exceptions/PasswordNotMatch";
import {TokenAuthService} from "../../../../Domain/Interfaces/Services/TokenAuthService";
import LoginResult from "../../Results/Auth/LoginResult";
import {UserRepository} from "../../../../Domain/Interfaces/Repositories/UserRepository";

class LoginHandler {
    private userRepository: UserRepository;
    private hashManager: HashManager;
    private tokenAuthService: TokenAuthService;

    public constructor(
        @inject(INTERFACES.IUserRepository) userRepository: UserRepository,
        @inject(INTERFACES.IHashManager) hashManager: HashManager,
        @inject(INTERFACES.ITokenAuthService) tokenAuthService: TokenAuthService,
    ) {
        this.userRepository = userRepository;
        this.hashManager = hashManager;
        this.tokenAuthService = tokenAuthService;
    }

    public async execute(command: LoginQuery) {
        const user = await this.userRepository.findOneByEmailOrFail(command.getEmail());

        if (!(await this.hashManager.check(command.getPassword(), user.getPassword()))) {
            throw new PasswordNotMatch();
        }

        if (!user.hashEmailVerified()) {
            throw new EmailNotVerified()
        }

        const token = await this.tokenAuthService.create(user);

        return new LoginResult(token, user);
    }
}

export default LoginHandler;