import {Application, Request, Response} from "express";

export default class CheckMaintenanceModeMiddleware {
    public handle(app: Application): Application {
        app.use((_req: Request, res: Response, next) => {
            if (Boolean(process.env.MAINTENANCE_MODE) === true) {
                return res.end('Service in maintenance mode, try later');
            } else {
                next();
            }
        });

        return app;
    }
}