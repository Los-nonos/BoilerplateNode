import "reflect-metadata";
import DIContainer from "../../../Common/DI/MockedDI";
import StoreUserHandler from "../../../../src/Application/Commands/Handler/Users/StoreUserHandler";
import { INTERFACES } from "../../../../src/Infrastructure/DI/interfaces.types";
import { UserRepository } from "../../../../src/Domain/Interfaces/Repositories/UserRepository";
import { HashManager } from "../../../../src/Domain/Interfaces/Services/HashManager";
import StoreUserCommand from "../../../../src/Application/Commands/Command/Users/StoreUserCommand";
import EmailAlreadyRegistered from "../../../../src/Application/Exceptions/EmailAlreadyRegistered";
import User from "../../../../src/Domain/Entities/User";

describe("StoreUserHandler tests", () => {
  const userRepository = DIContainer.get<UserRepository>(
    INTERFACES.IUserRepository
  );
  const hashManager = DIContainer.get<HashManager>(INTERFACES.IHashManager);
  let sut: StoreUserHandler;

  userRepository.persist = jest.fn().mockImplementationOnce((user: User) => {
    return user;
  });
  sut = new StoreUserHandler(userRepository, hashManager);

  test("should throw an exception because email is already registered", async (done) => {
    userRepository.checkIfEmailHasRepeated = jest
      .fn()
      .mockImplementationOnce((_email: string) => {
        throw new EmailAlreadyRegistered();
      });

    const command = new StoreUserCommand(
      "pepito",
      "perez",
      "email@registered.com",
      "passwordsupersecret"
    );

    await expect(sut.execute(command)).rejects.toStrictEqual(
      new EmailAlreadyRegistered()
    );
    expect(userRepository.persist).not.toBeCalled();
    done();
  });
});
