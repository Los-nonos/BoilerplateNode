import { IUserRepository } from "../../../../Domain/Interfaces/Repositories/IUserRepository";
import User from '../../../../Domain/Entities/User';
import TypeRepository from './TypeRepository';

class UserRepository extends TypeRepository implements IUserRepository {
    public async persist(user: User): Promise<User> {
        return await this.repository(User).persist(user);
    }

}

export default UserRepository;