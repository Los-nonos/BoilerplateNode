import StoreUserCommand from '../../Command/Users/StoreUserCommand';
import {inject, injectable} from "inversify";
import {INTERFACES} from "../../../../Infrastructure/DI/interfaces.types";
import {UserRepository} from "../../../../Domain/Interfaces/Repositories/UserRepository";
import User from "../../../../Domain/Entities/User";
import {HashManager} from "../../../../Domain/Interfaces/Services/HashManager";
import { CommandHandler } from '../../../../Domain/ValueObjects/CommandHandler';
import { Command } from '../../../../Domain/ValueObjects/Command';

@injectable()
class StoreUserHandler implements CommandHandler<StoreUserCommand> {
    private userRepository: UserRepository;
    private hashManager: HashManager;
    constructor(@inject(INTERFACES.IUserRepository) userRepository: UserRepository, @inject(INTERFACES.IHashManager) hashManager: HashManager) {
        this.userRepository = userRepository;
        this.hashManager = hashManager;
    }
    
    public subscribedTo(): Command {
        return StoreUserCommand;
    }

    public async handle(command: StoreUserCommand): Promise<void> {
        await this.userRepository.checkIfEmailHasRepeated(command.getEmail())

        const hashedPassword = await this.hashManager.hashValue(command.getPassword());
        const user = new User(command.getName(), command.getSurname(), command.getEmail(), hashedPassword);

        await this.userRepository.persist(user);
    }
}

export default StoreUserHandler;