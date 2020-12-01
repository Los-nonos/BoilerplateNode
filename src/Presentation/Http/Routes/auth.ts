import {inject, injectable} from "inversify";
import LoginAction from "../Actions/Auth/LoginAction";
import express, {Router} from "express";
import {asyncMiddleware} from "../Middlewares/AsyncMiddleware";
import StoreUserAction from "../Actions/Users/StoreUserAction";

@injectable()
export default class Auth {
  private router: Router;
  private loginAction: LoginAction;
  private storeAction: StoreUserAction;

  public constructor(
    @inject(LoginAction) loginAction: LoginAction,
    @inject(StoreUserAction) storeAction: StoreUserAction
  ) {
    this.router = Router();
    this.loginAction = loginAction;
    this.storeAction = storeAction;
    this.setRoutes();
  }

  private setRoutes() {
    this.router.post('/login',
      asyncMiddleware(async (req: express.Request, res: express.Response) => {
        await this.loginAction.execute(req, res);
      }));

    this.router.post('/register',
      asyncMiddleware(async (req: express.Request, res: express.Response) => {
        await this.storeAction.execute(req, res);
      }))
  }

  public getRoutes() {
    return this.router;
  }
}