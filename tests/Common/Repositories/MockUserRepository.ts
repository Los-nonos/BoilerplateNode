import { UserRepository } from "../../../src/Domain/Interfaces/Repositories/UserRepository";
import User from "../../../src/Domain/Entities/User";
import { injectable } from "inversify";

@injectable()
class MockUserRepository implements UserRepository {
  public checkIfEmailHasRepeated(_email: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public findOneByEmailOrFail(_email: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  public persist(_user: User): Promise<User> {
    return Promise.resolve(undefined);
  }
}

export default MockUserRepository;
