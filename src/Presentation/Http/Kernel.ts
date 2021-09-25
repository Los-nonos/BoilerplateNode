import {Application} from "express";
import {json, urlencoded} from 'express'
import ThrottleMiddleware from "./Middlewares/ThrottleMiddleware";
import CheckMaintenanceModeMiddleware from "./Middlewares/CheckMaintenanceModeMiddleware";
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

class HttpKernel {

    public handle(app: Application) {

        app = new ThrottleMiddleware().handle(app);
        app = new CheckMaintenanceModeMiddleware().handle(app);
        app.use(cors());
        app.use(morgan('dev'));
        app.use(json());
        app.use(urlencoded({ extended: true }));
        app.use(helmet.xssFilter());
        app.use(helmet.noSniff());
        app.use(helmet.hidePoweredBy());
        app.use(helmet.frameguard({ action: 'deny' }));
        app.use(compress());

        return app;
    }
}

export default HttpKernel;