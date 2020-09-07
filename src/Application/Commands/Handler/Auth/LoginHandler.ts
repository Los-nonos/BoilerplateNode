import {inject} from "inversify";
import {INTERFACES} from "../../../../Infrastructure/DI/interfaces.types";
import {IUserService} from "../../../../Domain/Interfaces/Services/IUserService";
import LoginCommand from "../../Command/Auth/LoginCommand";
import EmailNotVerified from "../../../Exceptions/EmailNotVerified";
import {IHashManager} from "../../../../Domain/Interfaces/Services/IHashManager";
import PasswordNotMatch from "../../../Exceptions/PasswordNotMatch";

class LoginHandler {
    private userService: IUserService;
    private hashManager: IHashManager;

    public constructor(
        @inject(INTERFACES.IUserService) userService: IUserService,
        @inject(INTERFACES.IHashManager) hashManager: IHashManager,
    ) {
        this.userService = userService;
        this.hashManager = hashManager;
    }

    public async execute(command: LoginCommand) {
        const user = await this.userService.findOneByEmailOrFail(command.getEmail());

        if (!(await this.hashManager.check(command.getPassword(), user.getPassword()))) {
            throw new PasswordNotMatch();
        }

        if (!user.hashEmailVerified()) {
            throw new EmailNotVerified()
        }

        //create token, persist and return value
    }
}

export default LoginHandler;