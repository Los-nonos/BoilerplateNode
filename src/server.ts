/* This will load app which contains our main structure and logic */
import 'reflect-metadata';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import * as http from 'http';
import httpStatus from 'http-status';
import { registerRoutes } from './Presentation/Http/Routes';
import * as customErrorHandler from './Infrastructure/ErrorHandler/errorHandler'
import DIContainer from './Infrastructure/DI/di.config';
import { INTERFACES } from './Infrastructure/DI/interfaces.types';
import { LoggerService } from './Domain/Interfaces/Services/LoggerService';


class Server {
  private express: express.Express;
  readonly port: string;
  private logger: LoggerService;
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.logger = DIContainer.get(INTERFACES.ILoggerService);
    this.express = express();

    const router = Router();
    router.use(customErrorHandler.logErrors);
    router.use(customErrorHandler.mapApplicationToHTTPErrors);
    router.use(errorHandler());
    this.express.use(router);
    registerRoutes(router);

    router.use((err: Error, _req: Request, res: Response, _next: Function) => {
      this.logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(
          `  Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        this.logger.info('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}

export default Server;
