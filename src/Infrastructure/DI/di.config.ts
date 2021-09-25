import { Container } from 'inversify';
import { INTERFACES } from './interfaces.types';
import {LoggerService} from "../../Domain/Interfaces/Services/LoggerService";
import WinstonLoggerService from "../Logger/Providers/WinstonLoggerService";
import LoginAction from "../../Presentation/Http/Actions/Auth/LoginAction";
import LoginAdapter from "../../Presentation/Http/Adapters/Auth/LoginAdapter";
import LoginHandler from "../../Application/Queries/Handler/Auth/LoginHandler";
import {ValidationService} from "../../Presentation/Http/Validations/Utils/ValidationService";
import JoiValidationService from "../../Presentation/Http/Validations/Utils/JoiValidationService";
import MysqlUserRepository from "../Persistence/mysql/Repositories/MysqlUserRepository";
import {UserRepository} from "../../Domain/Interfaces/Repositories/UserRepository";
import {HashManager} from "../../Domain/Interfaces/Services/HashManager";
import BCryptHashProvider from "../Hash/Providers/BCryptHashProvider";
import {TokenAuthService} from "../../Domain/Interfaces/Services/TokenAuthService";
import AuthProviderService from "../Auth/Provider/AuthProviderService";
import {TokenAuthRepository} from "../../Domain/Interfaces/Repositories/TokenAuthRepository";
import MysqlTokenAuthRepository from "../Persistence/mysql/Repositories/MysqlTokenAuthRepository";
import StoreUserAction from "../../Presentation/Http/Actions/Users/StoreUserAction";
import StoreUserAdapter from "../../Presentation/Http/Adapters/Users/StoreUserAdapter";
import StoreUserHandler from "../../Application/Commands/Handler/Users/StoreUserHandler";

const DIContainer = new Container();

/**
 * Actions
 */
DIContainer.bind<LoginAction>(LoginAction).toSelf();
DIContainer.bind<StoreUserAction>(StoreUserAction).toSelf();

/**
 * Adapters
 */
DIContainer.bind<LoginAdapter>(LoginAdapter).toSelf();
DIContainer.bind<StoreUserAdapter>(StoreUserAdapter).toSelf();

/**
 * Handlers
 */
DIContainer.bind<LoginHandler>(LoginHandler).toSelf();
DIContainer.bind<StoreUserHandler>(StoreUserHandler).toSelf();

/**
 * Services
 */
DIContainer.bind<TokenAuthService>(INTERFACES.ITokenAuthService).to(AuthProviderService);

DIContainer.bind<LoggerService>(INTERFACES.ILoggerService).to(WinstonLoggerService);
DIContainer.bind<ValidationService>(INTERFACES.IValidator).to(JoiValidationService);
DIContainer.bind<HashManager>(INTERFACES.IHashManager).to(BCryptHashProvider);

/**
 * Repositories
 */
DIContainer.bind<UserRepository>(INTERFACES.IUserRepository).to(MysqlUserRepository);
DIContainer.bind<TokenAuthRepository>(INTERFACES.ITokenAuthRepository).to(MysqlTokenAuthRepository);
export default DIContainer;