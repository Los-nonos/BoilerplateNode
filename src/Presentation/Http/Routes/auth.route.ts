import LoginAction from "../Actions/Auth/LoginAction";
import StoreUserAction from "../Actions/Users/StoreUserAction";
import DIContainer from "../../../Infrastructure/DI/di.config";
import {Router, Request, Response } from 'express';

export const register = (router: Router) => {
  const loginAction = DIContainer.get<LoginAction>(LoginAction);
  router.post('/login', (req: Request, res: Response) => loginAction.execute(req, res));

  const registerAction = DIContainer.get<StoreUserAction>(StoreUserAction);
  router.post('/register', (req: Request, res: Response) => registerAction.execute(req, res));
};
