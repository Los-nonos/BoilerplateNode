import { UserRepository } from "../../../../Domain/Interfaces/Repositories/UserRepository";
import User from '../../../../Domain/Entities/User';
import TypeRepository from './TypeRepository';
import EntityNotFound from "../../../../Application/Exceptions/EntityNotFound";

class MysqlUserRepository extends TypeRepository implements UserRepository {
    public async persist(user: User): Promise<User> {
        return await this.repository(User).persist(user);
    }

    public async findOneByEmailOrFail(email: string): Promise<User> {
        const user = await this.repository(User).findOne({where: {email}});

        if (!user) {
            throw new EntityNotFound(`User with email: ${email} not found`);
        }

        return user;
    }

}

export default MysqlUserRepository;