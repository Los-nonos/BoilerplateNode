import { Request, Response, NextFunction } from 'express';
import {inject} from "inversify";
import {INTERFACES} from "../../../Infrastructure/DI/interfaces.types";
import {IUserService} from "../../../Domain/Interfaces/Services/IUserService";
import {ITokenAuthService} from "../../../Domain/Interfaces/Services/ITokenAuthService";
import Forbidden from "../Exceptions/Forbbiden";
import UnauthorizedException from "../Exceptions/UnauthorizedException";

export default class AuthMiddleware {
    private userService: IUserService;
    private tokenAuthService: ITokenAuthService;

    public constructor(
        @inject(INTERFACES.ITokenAuthService) tokenAuthService: ITokenAuthService,
        @inject(INTERFACES.IUserService) userService: IUserService) {
        this.tokenAuthService = tokenAuthService;
        this.userService = userService;
    }

    public async handle(req: Request, _res: Response, next: NextFunction, roles: string[]) {
        const authorization = req.header('Authorization') || req.query.Authorization;

        if (!authorization) {
            throw new UnauthorizedException('a token was not provided');
        }

        if (typeof authorization !== "string") {
            throw new UnauthorizedException('token was provided is haven\'t valid pattern');
        }

        const token = await this.tokenAuthService.findOneByHashOrFail(authorization);

        const user = await this.userService.findOneByIdOrFail(token.getUserId());

        const role = user.getRole();

        if (roles.includes(role)) {
            next();
        }
        else {
            throw new Forbidden('Forbidden');
        }
    }
}