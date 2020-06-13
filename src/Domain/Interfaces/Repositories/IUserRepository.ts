import User from '../../Entities/User';

export interface IUserRepository {
    persist(user: User): Promise<User>
}