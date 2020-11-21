import {inject, injectable} from 'inversify';
import * as express from 'express';
import Auth from "./auth";


@injectable()
export default class ApiRoutes {
    private router: express.Router;
    private authRoutes: Auth;
    
    public constructor(@inject(Auth) authRoutes: Auth) {
        this.router = express.Router();
        this.authRoutes = authRoutes;
        this.setRoutes();
    }

    private setRoutes(): void {
        this.router.get('/', () => {
            return 'Hello!';
        });

        this.router.use('/auth', this.authRoutes.getRoutes());
    }

    public getRoutes(): express.Router {
        return this.router;
    }
}