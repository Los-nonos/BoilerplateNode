import User from '../../Entities/User';

export interface UserRepository {
    persist(user: User): Promise<User>;
    findOneByEmailOrFail(email: string): Promise<User>;
}