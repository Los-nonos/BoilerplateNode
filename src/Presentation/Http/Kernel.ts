import {Application} from "express";
import ThrottleMiddleware from "./Middlewares/ThrottleMiddleware";
import CheckMaintenanceModeMiddleware from "./Middlewares/CheckMaintenanceModeMiddleware";

class HttpKernel {

    public handle(app: Application) {

        app = new ThrottleMiddleware().handle(app);
        app = new CheckMaintenanceModeMiddleware().handle(app);

        return app;
    }
}

export default HttpKernel;