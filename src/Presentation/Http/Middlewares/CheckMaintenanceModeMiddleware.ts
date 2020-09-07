import {Application, Request, Response} from "express";
import {env} from "../../../config/environment";

export default class CheckMaintenanceModeMiddleware {
    public handle(app: Application): Application {
        app.use((_req: Request, res: Response, next) => {
            if (env('MAINTENANCE_MODE') === true) {
                return res.end('Service in maintenance mode, try later');
            } else {
                next();
            }
        });

        return app;
    }
}