import { Request, Response, NextFunction } from 'express';
import {inject, injectable} from "inversify";
import {INTERFACES} from "../../../Infrastructure/DI/interfaces.types";
import {TokenAuthService} from "../../../Domain/Interfaces/Services/TokenAuthService";
import Forbidden from "../Exceptions/Forbbiden";
import UnauthorizedException from "../Exceptions/UnauthorizedException";

@injectable()
export default class AuthMiddleware {
    private tokenAuthService: TokenAuthService;

    public constructor(
        @inject(INTERFACES.ITokenAuthService) tokenAuthService: TokenAuthService) {
        this.tokenAuthService = tokenAuthService;
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

        const user = token.getUser();

        const role = user.getRole();

        if (roles.includes(role)) {
            next();
        }
        else {
            throw new Forbidden('Forbidden');
        }
    }
}