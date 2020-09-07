import { Request, Response } from 'express';
import {HTTP_CODES} from "../../Enums/HttpCodes";
import {inject} from "inversify";
import LoginAdapter from "../../Adapters/LoginAdapter";
import LoginHandler from "../../../../Application/Commands/Handler/Auth/LoginHandler";

class LoginAction {
    private adapter: LoginAdapter;
    private handler: LoginHandler;

    public constructor(
        @inject(LoginAdapter) adapter: LoginAdapter,
        @inject(LoginHandler) handler: LoginHandler
    ) {
        this.adapter = adapter;
        this.handler = handler;
    }

    public async execute(req: Request, res: Response) {
        const command = this.adapter.from(req.body);

        const result = await this.handler.execute(command);

        return res.status(HTTP_CODES.OK).json({}).setHeader('Authorization', result.getToken().getHash());
    }
}

export default LoginAction;