import User from '../../Entities/User';

export interface IUserService {
    persist(user: User): Promise<User>;
}