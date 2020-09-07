import User from '../../Entities/User';

export interface IUserService {
    persist(user: User): Promise<User>;
    findOneByIdOrFail(userId: any): Promise<User>;
    findOneByEmailOrFail(email: string): Promise<User>;
}