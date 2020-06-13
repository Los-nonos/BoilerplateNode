import {injectable} from 'inversify';
import * as express from 'express';


@injectable()
export default class ApiRoutes {
    private router: express.Router;
    
    public constructor() {
        
        this.router = express.Router();
    }

    private setRoutes(): void {
        this.router.get('/', () => {
            return 'Hello!';
        });
    }

    public getRoutes(): express.Router {
        return this.router;
    }
}