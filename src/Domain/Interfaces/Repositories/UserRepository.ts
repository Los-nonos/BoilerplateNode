import User from '../../Entities/User';

export interface UserRepository {
  findOneById(id: number): Promise<User>;

  persist(user: User): Promise<User>;

  findOneByEmailOrFail(email: string): Promise<User>;

  checkIfEmailHasRepeated(email: string): Promise<void>;
}