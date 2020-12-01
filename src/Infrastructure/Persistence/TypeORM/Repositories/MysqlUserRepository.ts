import { UserRepository } from "../../../../Domain/Interfaces/Repositories/UserRepository";
import User from '../../../../Domain/Entities/User';
import TypeRepository from './TypeRepository';
import EntityNotFound from "../../../../Application/Exceptions/EntityNotFound";
import EmailAlreadyRegistered from "../../../../Application/Exceptions/EmailAlreadyRegistered";

class MysqlUserRepository extends TypeRepository implements UserRepository {
    public async persist(user: User): Promise<User> {
        return await this.repository(User).save(user);
    }

    public async findOneByEmailOrFail(email: string): Promise<User> {
        const user = await this.repository(User).findOne({where: {email}});

        if (!user) {
            throw new EntityNotFound(`User with email: ${email} not found`);
        }

        return user;
    }

    public async checkIfEmailHasRepeated(email: string): Promise<void> {
        const user = await this.repository(User).findOne({where: {email}});

        if (user) {
            throw new EmailAlreadyRegistered(`Email: ${email} has already registered`);
        }
    }

}

export default MysqlUserRepository;