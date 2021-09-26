import {Application,json, urlencoded} from "express";
import ThrottleMiddleware from "./Middlewares/ThrottleMiddleware";
import CheckMaintenanceModeMiddleware from "./Middlewares/CheckMaintenanceModeMiddleware";
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import DIContainer from "../../Infrastructure/DI/di.config";
import { UserRepository } from "../../Domain/Interfaces/Repositories/UserRepository";
import { INTERFACES } from "../../Infrastructure/DI/interfaces.types";
import User from "../../Domain/Entities/User";

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

        const userRepository = DIContainer.get<UserRepository>(INTERFACES.IUserRepository);

        passport.serializeUser(function(user: User, done) {
            done(null, user.getId());
        });
          
        passport.deserializeUser(function(id: number, done) {
            userRepository.findOneById(id).then(user => done(null, user)).catch(err => done(err, null));
        });

        app.use(passport.initialize());
        app.use(passport.session());

        return app;
    }
}

export default HttpKernel;