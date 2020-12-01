const rateLimit = require("express-rate-limit");
import {Application} from "express";

class ThrottleMiddleware {
    public handle(app: Application, maxAttempts = 60): Application {

        // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
        // see https://expressjs.com/en/guide/behind-proxies.html
        // app.set('trust proxy', 1);

        const apiLimiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: maxAttempts,
            message:
                "Too many accounts created from this IP, please try again after an 15 minutes"
        });

        return app.use(apiLimiter);
    }
}

export default ThrottleMiddleware;