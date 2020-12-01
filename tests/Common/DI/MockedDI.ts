import "reflect-metadata";
import { Container } from "inversify";
import { UserRepository } from "../../../src/Domain/Interfaces/Repositories/UserRepository";
import { INTERFACES } from "../../../src/Infrastructure/DI/interfaces.types";
import MockUserRepository from "../Repositories/MockUserRepository";
import { HashManager } from "../../../src/Domain/Interfaces/Services/HashManager";
import MockHashManager from "../Services/MockHashManager";

const DIContainer = new Container();

DIContainer.bind<UserRepository>(INTERFACES.IUserRepository).to(
  MockUserRepository
);

DIContainer.bind<HashManager>(INTERFACES.IHashManager).to(MockHashManager);

export default DIContainer;
