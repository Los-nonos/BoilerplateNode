import {Application} from "express";
import ThrottleMiddleware from "./Middlewares/ThrottleMiddleware";
import CheckMaintenanceModeMiddleware from "./Middlewares/CheckMaintenanceModeMiddleware";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

class HttpKernel {

    public handle(app: Application) {

        app = new ThrottleMiddleware().handle(app);
        app = new CheckMaintenanceModeMiddleware().handle(app);
        app.use(cors());
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(helmet());

        return app;
    }
}

export default HttpKernel;