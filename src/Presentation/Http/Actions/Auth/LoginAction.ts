import {NextFunction, Request, Response} from 'express';
import {HTTP_CODES} from "../../Enums/HttpCodes";
import {inject, injectable} from "inversify";
import LoginAdapter from "../../Adapters/Auth/LoginAdapter";
import LoginHandler from "../../../../Application/Queries/Handler/Auth/LoginHandler";

@injectable()
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

  public async execute(req: Request, res: Response, next: NextFunction) {
    const command = this.adapter.from(req.body);

    const result = await this.handler.handle(command);

    req.login(result.getUser(), (err) => {
      if (err) {
        return next(err);
      }
      
      res.cookie(`${process.env.APP_NAME}_cookie`, result.getToken().getHash())
        .status(HTTP_CODES.OK)
        .json({
          user: result.getUser().getId(),
          token: result.getToken().getHash()
        });
    });    
  }
}

export default LoginAction;